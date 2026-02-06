export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    description?: string;
    categoryId?: string;
    category?: string; // Legacy/UI helper
    image: string;
    stock: number;
    isActive?: boolean;
    createdAt?: object | Date; // Firestore Timestamp or Date
    updatedAt?: object | Date;
}

export interface Category {
    id: string; // Firestore ID
    name: string;
    image: string;
    isActive: boolean;
    createdAt?: object | Date;
    updatedAt?: object | Date;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface AdminAuthState {
    isAuthenticated: boolean;
    user: string | null;
}
