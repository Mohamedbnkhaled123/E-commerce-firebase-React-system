import { FirebaseService } from './firebase.service';
import type { EntityService } from './types';

export class ServiceFactory {
    static getService<T extends { id?: string }>(collectionName: string): EntityService<T> {
        return new FirebaseService<T>(collectionName);
    }
}
