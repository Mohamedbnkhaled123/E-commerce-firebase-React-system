export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    description: string;
    category: string;
    image: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface AdminAuthState {
    isAuthenticated: boolean;
    user: string | null;
}
