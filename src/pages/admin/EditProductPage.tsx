
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/useProductStore';
import { ProductForm } from '../../components/admin/ProductForm';
import type { Product } from '../../types';

export const EditProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, updateProduct } = useProductStore();
    const product = products.find((p) => p.id === id);

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleUpdateProduct = async (data: Omit<Product, 'id'>) => {
        try {
            // Optimistic update - resolves immediately
            await updateProduct(id!, data);
            navigate('/admin');
        } catch (error: unknown) {
            // Background sync errors are handled in the store
            console.error("Failed to update product:", error);
            const message = error instanceof Error ? error.message : 'Unknown error';
            alert(`Failed to update product: ${message}`);
        }
    };

    return (
        <div>
            <ProductForm
                title="Edit Product"
                initialData={product}
                onSubmit={handleUpdateProduct}
            />
        </div>
    );
};
