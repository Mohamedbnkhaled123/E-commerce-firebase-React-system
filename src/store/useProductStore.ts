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
        name: 'Elegant Midi Dress',
        price: 129.99,
        originalPrice: 159.99,
        description: 'Timeless midi dress in soft beige with delicate pleats. Perfect for any occasion.',
        category: 'Dresses',
        image: '/products/dress-beige.png',
    },
    {
        id: '2',
        name: 'Classic Blouse',
        price: 79.50,
        description: 'Crisp white blouse with elegant button details and subtle feminine touches.',
        category: 'Blouses',
        image: '/products/blouse-white.png',
    },
    {
        id: '3',
        name: 'Cozy Sweatshirt',
        price: 89.00,
        originalPrice: 109.00,
        description: 'Premium cotton sweatshirt in warm neutral tones for effortless style.',
        category: 'Sweatshirts',
        image: '/products/sweatshirt-beige.png',
    },
    {
        id: '4',
        name: 'Floral Summer Dress',
        price: 139.99,
        description: 'Light and airy dress with delicate floral patterns. Ideal for warm days.',
        category: 'Dresses',
        image: '/products/dress-floral.png',
    },
    {
        id: '5',
        name: 'Silk Blouse',
        price: 149.00,
        originalPrice: 180.00,
        description: 'Luxurious silk blouse with flowing drape and sophisticated design.',
        category: 'Blouses',
        image: '/products/blouse-silk.png',
    },
    {
        id: '6',
        name: 'Oversized Sweatshirt',
        price: 95.00,
        description: 'Comfortable oversized fit with soft fleece lining. A wardrobe essential.',
        category: 'Sweatshirts',
        image: '/products/sweatshirt-beige.png',
    },
    {
        id: '7',
        name: 'Evening Maxi Dress',
        price: 189.99,
        description: 'Flowing maxi dress in rich burgundy perfect for evening events.',
        category: 'Dresses',
        image: '/products/dress-burgundy.png',
    },
    {
        id: '8',
        name: 'Linen Blouse',
        price: 85.00,
        originalPrice: 105.00,
        description: 'Breathable linen blouse in natural tones for casual elegance.',
        category: 'Blouses',
        image: '/products/blouse-white.png',
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
