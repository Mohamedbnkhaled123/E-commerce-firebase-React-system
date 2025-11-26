import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types';

interface ProductStore {
    products: Product[];
    setProducts: (products: Product[]) => void;
    addProduct: (product: Product) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
}

// Mock Data
const INITIAL_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 249.99,
        originalPrice: 299.99,
        description: 'High-fidelity audio with noise cancellation and 30-hour battery life.',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    },
    {
        id: '2',
        name: 'Minimalist Watch',
        price: 149.50,
        description: 'Elegant design with genuine leather strap and sapphire crystal glass.',
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    },
    {
        id: '3',
        name: 'Ergonomic Office Chair',
        price: 399.00,
        originalPrice: 450.00,
        description: 'Designed for comfort and productivity with adjustable lumbar support.',
        category: 'Furniture',
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80',
    },
    {
        id: '4',
        name: 'Smart Fitness Tracker',
        price: 89.99,
        description: 'Track your health metrics, sleep, and workouts with precision.',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80',
    },
    {
        id: '5',
        name: 'Designer Sunglasses',
        price: 99.00,
        originalPrice: 120.00,
        description: 'UV protection with a classic frame that suits every face shape.',
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    },
    {
        id: '6',
        name: 'Mechanical Keyboard',
        price: 180.00,
        description: 'Tactile switches and customizable RGB lighting for the ultimate typing experience.',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=800&q=80',
    },
];

export const useProductStore = create<ProductStore>()(
    persist(
        (set) => ({
            products: INITIAL_PRODUCTS,
            setProducts: (products) => set({ products }),
            addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
            updateProduct: (id, updates) =>
                set((state) => ({
                    products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
                })),
            deleteProduct: (id) =>
                set((state) => ({
                    products: state.products.filter((p) => p.id !== id),
                })),
        }),
        {
            name: 'product-storage', // localStorage key
        }
    )
);
