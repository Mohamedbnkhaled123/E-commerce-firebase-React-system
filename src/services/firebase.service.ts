import {
    collection,
    setDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    getDocs,
    Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { EntityService } from './types';

export class FirebaseService<T extends { id?: string }> implements EntityService<T> {
    private collectionRef;

    constructor(collectionName: string) {
        this.collectionRef = collection(db, collectionName);
    }

    async getAll(): Promise<T[]> {
        const q = query(this.collectionRef);
        const snapshot = await getDocs(q);
        return snapshot.docs
            .map(doc => {
                const data = doc.data();
                if (!data) {
                    console.warn(`Document ${doc.id} has no data, skipping`);
                    return null;
                }
                return { ...data, id: doc.id } as unknown as T;
            })
            .filter((item): item is T => item !== null);
    }

    async getById(_id: string): Promise<T | null> {
        // Not strictly required by prompt by useful
        return null;
    }

    // Helper to remove undefined fields because Firestore doesn't support them
    private cleanData(data: Partial<T> | Record<string, unknown>): Record<string, unknown> {
        return Object.entries(data).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = value;
            }
            return acc;
        }, {} as Record<string, unknown>);
    }

    async create(data: Omit<T, 'id'> & { id?: string }): Promise<string> {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id: _id, ...rest } = data as T;
            const cleanedData = this.cleanData(rest);

            // Generate a new ID manually
            const newDocRef = doc(this.collectionRef);

            // Use Timestamp.now() for immediate resolution without server round-trip
            const now = Timestamp.now();

            // Use setDoc instead of addDoc to avoid hanging promises in offline mode
            await setDoc(newDocRef, {
                ...cleanedData,
                createdAt: now,
                updatedAt: now
            });

            return newDocRef.id;
        } catch (error) {
            console.error(`Failed to create document in ${this.collectionRef.path}:`, error);
            throw error;
        }
    }

    async update(id: string, updates: Partial<T>): Promise<void> {
        try {
            const docRef = doc(this.collectionRef, id);
            const cleanedUpdates = this.cleanData(updates);

            // Using setDoc with merge and Timestamp.now() for immediate resolution
            await setDoc(docRef, {
                ...cleanedUpdates,
                updatedAt: Timestamp.now()
            }, { merge: true });
        } catch (error) {
            console.error('[FirebaseService] Error in update:', error);
            throw error;
        }
    }

    async delete(id: string): Promise<void> {
        const docRef = doc(this.collectionRef, id);
        await deleteDoc(docRef);
    }

    subscribe(callback: (data: T[]) => void): () => void {
        const q = query(this.collectionRef);
        return onSnapshot(q, (snapshot) => {
            const items = snapshot.docs
                .map(doc => {
                    const data = doc.data();
                    // Skip documents with null/undefined data
                    if (!data) {
                        console.warn(`Document ${doc.id} has no data, skipping`);
                        return null;
                    }
                    return {
                        ...data,
                        id: doc.id,
                        // Handle Timestamp conversion if necessary for frontend
                    } as unknown as T;
                })
                .filter((item): item is T => item !== null); // Remove null items
            callback(items);
        }, (error) => {
            console.error("Firestore subscription error:", error);
        });
    }
}
