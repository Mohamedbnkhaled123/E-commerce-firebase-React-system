import { FirebaseService } from './firebase.service';
import type { Category } from '../types';

export const categoriesService = new FirebaseService<Category>('categories');
