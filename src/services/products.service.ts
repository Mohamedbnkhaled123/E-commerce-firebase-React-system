import { FirebaseService } from './firebase.service';
import type { Product } from '../types';

export const productsService = new FirebaseService<Product>('products');
