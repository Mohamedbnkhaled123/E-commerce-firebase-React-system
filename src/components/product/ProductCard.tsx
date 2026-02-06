import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../common/Button';
import { ImageWithFallback } from '../common/ImageWithFallback';

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
        <Link to={`/products/${product.id}`} className="group relative block overflow-hidden rounded-xl bg-white border border-velora-muted shadow-sm transition-all hover:shadow-md">
            {/* Discount Badge */}
            {hasDiscount && (
                <div className="absolute left-4 top-4 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                    -{discountPercentage}%
                </div>
            )}

            {/* Stock Badge - Only show if stock < 10 or out of stock */}
            {product.stock === 0 ? (
                <div className="absolute right-4 top-4 z-10 rounded-full bg-gray-900 px-3 py-1 text-xs font-bold text-white shadow-md">
                    Out of Stock
                </div>
            ) : product.stock < 10 && (
                <div className={`absolute right-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-bold text-white shadow-md ${product.stock < 5 ? 'bg-red-600' : 'bg-orange-500'
                    }`}>
                    Only {product.stock} left{product.stock < 5 ? '!' : ''}
                </div>
            )}

            <div className="relative aspect-square overflow-hidden bg-velora-bg">
                <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-velora">{product.category}</p>
                <h3 className="mt-1 text-base font-serif font-medium text-velora-text line-clamp-1">{product.name}</h3>

                <div className="mt-2 flex items-center gap-2">
                    <p className={`text-lg font-bold ${hasDiscount ? 'text-red-600' : 'text-velora-dark'}`}>
                        ${product.price.toFixed(2)}
                    </p>
                    {hasDiscount && (
                        <p className="text-sm text-gray-400 line-through decoration-gray-300">
                            ${product.originalPrice?.toFixed(2)}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <Button
                        onClick={handleAddToCart}
                        className="w-full gap-2"
                        disabled={product.stock === 0}
                    >
                        <ShoppingCart className="h-4 w-4" />
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                </div>
            </div>
        </Link>
    );
};
