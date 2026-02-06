
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/useProductStore';
import { ProductForm } from '../../components/admin/ProductForm';
import type { Product } from '../../types';

export const AddProductPage = () => {
    const navigate = useNavigate();
    const addProduct = useProductStore((state) => state.addProduct);

    const handleAddProduct = async (data: Omit<Product, 'id'>) => {
        try {
            // No await needed for valid optimistic update promise, but since we return a promise that resolves immediately, await is fine (it takes 0ms).
            // Key is that addProduct internally does not wait for firebase.
            await addProduct(data);
            navigate('/admin');
        } catch (error: unknown) {
            // This catch block will only trigger if the synchronous part of addProduct fails (rare)
            // Background sync errors are handled in the store
            console.error("Failed to add product:", error);
            const message = error instanceof Error ? error.message : 'Unknown error';
            alert(`Failed to create product: ${message}`);
        }
    };

    return (
        <div>
            <ProductForm
                title="Add New Product"
                onSubmit={handleAddProduct}
            />
        </div>
    );
};
