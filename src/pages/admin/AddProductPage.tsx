
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/useProductStore';
import { ProductForm } from '../../components/admin/ProductForm';

export const AddProductPage = () => {
    const navigate = useNavigate();
    const addProduct = useProductStore((state) => state.addProduct);

    const handleAddProduct = (data: any) => {
        const newProduct = {
            ...data,
            id: Math.random().toString(36).substr(2, 9), // Simple ID generation
        };
        addProduct(newProduct);
        navigate('/admin');
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
