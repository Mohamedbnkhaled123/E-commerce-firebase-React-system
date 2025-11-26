
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/useProductStore';
import { ProductForm } from '../../components/admin/ProductForm';

export const EditProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, updateProduct } = useProductStore();
    const product = products.find((p) => p.id === id);

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleUpdateProduct = (data: any) => {
        updateProduct(id!, data);
        navigate('/admin');
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
