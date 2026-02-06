import type { Category } from '../types';
export type { Category };

export const CATEGORIES: Category[] = [
    { id: 'cat-bags', name: 'Bags', image: '/products/bag-tote.png', isActive: true },
    { id: 'cat-dresses', name: 'Dresses', image: '/products/dress-floral.png', isActive: true },
    { id: 'cat-sweatshirts', name: 'Sweatshirts', image: '/products/sweatshirt-beige.png', isActive: true },
    { id: 'cat-blouses', name: 'Blouses', image: '/products/blouse-silk.png', isActive: true },
];
