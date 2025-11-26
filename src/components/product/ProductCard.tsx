import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../common/Button';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const { showToast } = useToast();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation when clicking the button
        addToCart(product);
        showToast('success', 'Added to cart successfully!');
    };

    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    const discountPercentage = hasDiscount
        ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
        : 0;

    return (
        <Link to={`/products/${product.id}`} className="group relative block overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md">
            {/* Discount Badge */}
            {hasDiscount && (
                <div className="absolute left-4 top-4 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                    -{discountPercentage}%
                </div>
            )}

            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            <div className="p-4">
                <p className="text-xs font-medium text-gray-500">{product.category}</p>
                <h3 className="mt-1 text-sm font-medium text-gray-900 line-clamp-1">{product.name}</h3>

                <div className="mt-2 flex items-center gap-2">
                    <p className={`text-lg font-bold ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
                        ${product.price.toFixed(2)}
                    </p>
                    {hasDiscount && (
                        <p className="text-sm text-gray-500 line-through decoration-gray-400">
                            ${product.originalPrice?.toFixed(2)}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <Button
                        onClick={handleAddToCart}
                        className="w-full gap-2"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </Link>
    );
};
