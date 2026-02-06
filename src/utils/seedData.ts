import { ServiceFactory } from '../services/factory';
import { INITIAL_PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import type { Product, Category } from '../types';

// Flag to prevent concurrent execution
let isSeeding = false;
let hasSeeded = false;

export async function seedInitialData() {
    // Prevent concurrent execution (StrictMode double-invocation)
    if (isSeeding || hasSeeded) {
        return;
    }

    isSeeding = true;

    try {
        const productService = ServiceFactory.getService<Product>('products');
        const categoryService = ServiceFactory.getService<Category>('categories');

        // Check if categories already exist
        const existingCategories = await categoryService.getAll();

        // Only seed if collection is empty or incomplete
        if (existingCategories.length === 0) {
            // Seed all categories
            for (const category of CATEGORIES) {
                const { id: _unused, ...catData } = category;
                await categoryService.create(catData as Category);
            }
        } else {
            // Check for missing categories and add them
            const categoryMap = new Map<string, Category>();
            existingCategories.forEach(cat => {
                categoryMap.set(cat.name.trim().toLowerCase(), cat);
            });

            for (const targetCat of CATEGORIES) {
                const normalizedName = targetCat.name.trim().toLowerCase();
                if (!categoryMap.has(normalizedName)) {
                    await categoryService.create(targetCat as Category);
                }
            }

            // Clean up duplicates if any exist
            const duplicateCheck = new Map<string, Category[]>();
            existingCategories.forEach(cat => {
                const normalizedName = cat.name.trim().toLowerCase();
                if (!duplicateCheck.has(normalizedName)) {
                    duplicateCheck.set(normalizedName, []);
                }
                duplicateCheck.get(normalizedName)?.push(cat);
            });

            for (const [, cats] of duplicateCheck.entries()) {
                if (cats.length > 1) {
                    // Keep the first one, delete the rest
                    for (let i = 1; i < cats.length; i++) {
                        if (cats[i].id) {
                            await categoryService.delete(cats[i].id!);
                        }
                    }
                }
            }
        }

        // Check if products already exist
        const existingProducts = await productService.getAll();

        // Backfill missing createdAt for existing products
        for (const p of existingProducts) {
            if (!p.createdAt) {
                await productService.update(p.id!, {
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }
        }

        // Seed missing products
        if (existingProducts.length < INITIAL_PRODUCTS.length) {
            for (const product of INITIAL_PRODUCTS) {
                const { id: _unused, ...productData } = product; // Remove static ID
                const sName = product.name.trim().toLowerCase();
                const exists = existingProducts.some(p => p.name.trim().toLowerCase() === sName);

                if (!exists) {
                    await productService.create({
                        ...productData,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    } as any);
                }
            }
        }

        hasSeeded = true;

    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        isSeeding = false;
    }
}
