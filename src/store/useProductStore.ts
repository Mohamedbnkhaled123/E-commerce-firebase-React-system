import { create } from 'zustand';
import type { Product } from '../types';
import { type Category } from '../types';
import { ServiceFactory } from '../services/factory';
import { CATEGORIES } from '../data/categories';

const productService = ServiceFactory.getService<Product>('products');
const categoryService = ServiceFactory.getService<Category>('categories');

interface ProductStore {
    products: Product[];
    categories: Category[];
    isLoading: boolean;
    setProducts: (products: Product[]) => void;
    addProduct: (product: Omit<Product, 'id'>) => Promise<string>;
    updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    reduceStock: (id: string, quantity: number) => Promise<void>;
    addCategory: (category: Category) => Promise<string>;
    initialize: () => () => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    categories: CATEGORIES,
    isLoading: true,
    setProducts: (products) => set({ products, isLoading: false }),

    addProduct: async (product) => {
        // Generate temporary ID for immediate UI update
        const tempId = crypto.randomUUID();
        const newProduct = { ...product, id: tempId, createdAt: new Date() };

        // 1. Optimistic Update: Update state immediately
        set(state => ({
            products: [newProduct, ...state.products]
        }));

        // 2. Background Sync: Send to Firebase
        // We don't await this to return immediately, but we catch errors for rollback
        productService.create(product).then(realId => {
            // Update the temporary ID with real ID in the store
            set(state => ({
                products: state.products.map(p => p.id === tempId ? { ...p, id: realId } : p)
            }));
        }).catch((error: unknown) => {
            console.error('Failed to add product (background sync):', error);
            // Rollback: Remove the optimistically added product
            set(state => ({
                products: state.products.filter(p => p.id !== tempId)
            }));
            // Optionally dispatch a global error/toast event here
        });

        // Return immediately to allow navigation
        return tempId;
    },

    updateProduct: async (id, updates) => {
        const currentProducts = get().products;

        // 1. Optimistic Update
        set(state => ({
            products: state.products.map(p =>
                p.id === id ? { ...p, ...updates } : p
            )
        }));

        // 2. Background Sync
        productService.update(id, updates).catch((error: unknown) => {
            console.error('Failed to update product (background sync):', error);
            // Rollback
            set({ products: currentProducts });
            // Optionally dispatch a global error/toast event here
        });

        // Return immediately
        return;
    },

    deleteProduct: async (id) => {
        // Optimistic update
        const currentProducts = get().products;
        set(state => ({
            products: state.products.filter(p => p.id !== id)
        }));

        try {
            await productService.delete(id);
        } catch (error) {
            console.error('Failed to delete product:', error);
            // Rollback on error
            set({ products: currentProducts });
            throw error;
        }
    },

    reduceStock: async (id, quantity) => {
        const product = get().products.find(p => p.id === id);
        if (product) {
            try {
                await productService.update(id, { stock: Math.max(0, product.stock - quantity) });
            } catch (error) {
                console.error('Failed to reduce stock:', error);
                throw error;
            }
        }
    },

    addCategory: async (category) => {
        try {
            return await categoryService.create(category);
        } catch (error) {
            console.error('Failed to add category:', error);
            throw error;
        }
    },

    initialize: () => {
        let currentProducts: Product[] = [];

        const updateState = () => {
            const enrichedProducts = currentProducts.map(p => ({
                ...p,
                category: CATEGORIES.find(c => c.name === p.category || c.id === p.categoryId || c.id === p.category)?.name || p.category || 'Uncategorized'
            }));

            set({ products: enrichedProducts, categories: CATEGORIES, isLoading: false });
        };

        const unsubProducts = productService.subscribe((products) => {
            // Sort by newest first
            const sortedProducts = products.sort((a, b) => {
                const getTime = (date?: object | Date) => {
                    if (!date) return 0;
                    if ('seconds' in date) return (date as { seconds: number }).seconds * 1000;
                    if (date instanceof Date) return date.getTime();
                    return 0;
                };
                return getTime(b.createdAt) - getTime(a.createdAt);
            });

            currentProducts = sortedProducts;
            updateState();
        });

        return () => {
            unsubProducts();
        };
    }
}));
