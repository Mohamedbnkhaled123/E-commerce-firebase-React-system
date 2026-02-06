export interface EntityService<T> {
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T | null>;
    create(data: Omit<T, 'id'> & { id?: string }): Promise<string>;
    update(id: string, updates: Partial<T>): Promise<void>;
    delete(id: string): Promise<void>;
    subscribe(callback: (data: T[]) => void): () => void;
}
