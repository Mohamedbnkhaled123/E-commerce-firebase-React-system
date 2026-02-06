import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useCartStore } from '../../store/useCartStore';
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../../components/common/Button';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';

export const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = useProductStore((state) => state.products.find((p) => p.id === id));
    const addToCart = useCartStore((state) => state.addToCart);
    const { showToast } = useToast();

    if (!product) {
        return (
            <div className="flex h-96 flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
                <Button className="mt-4" onClick={() => navigate('/products')}>
                    Back to Products
                </Button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
        showToast('success', 'Added to cart successfully!');
    };

    const handleBuyNow = () => {
        addToCart(product);
        navigate('/cart');
    };

    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    const discountPercentage = hasDiscount
        ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
        : 0;

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
                <Breadcrumbs
                    items={[
                        { label: 'Products', href: '/products' },
                        { label: product.category || 'Uncategorized', href: `/products?category=${product.category || ''}` },
                        { label: product.name },
                    ]}
                />
            </div>

            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
                    {hasDiscount && (
                        <div className="absolute left-6 top-6 z-10 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-md">
                            SAVE {discountPercentage}%
                        </div>
                    )}

                    {/* Stock Badge */}
                    {product.stock === 0 ? (
                        <div className="absolute right-6 top-6 z-10 rounded-full bg-gray-900 px-4 py-2 text-sm font-bold text-white shadow-md">
                            Out of Stock
                        </div>
                    ) : product.stock < 10 && (
                        <div className={`absolute right-6 top-6 z-10 rounded-full px-4 py-2 text-sm font-bold text-white shadow-md ${product.stock < 5 ? 'bg-red-600' : 'bg-orange-500'
                            }`}>
                            Only {product.stock} left{product.stock < 5 ? '!' : ''}
                        </div>
                    )}
                    <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                {/* Product Info */}
                <div className="mt-10 px-4 lg:mt-0 lg:px-0">
                    <div className="mb-6">
                        <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-700/10">
                            {product.category}
                        </span>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            {product.name}
                        </h1>
                    </div>

                    <div className="mt-4 flex items-baseline gap-4">
                        <p className={`text-4xl font-bold tracking-tight ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
                            ${product.price.toFixed(2)}
                        </p>
                        {hasDiscount && (
                            <p className="text-xl text-gray-500 line-through decoration-gray-400">
                                ${product.originalPrice?.toFixed(2)}
                            </p>
                        )}
                    </div>

                    <div className="mt-8 space-y-6">
                        <p className="text-base text-gray-600 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Stock Info */}
                        {product.stock < 10 && product.stock > 0 && (
                            <div className={`rounded-lg p-4 ${product.stock < 5 ? 'bg-red-50 border border-red-200' : 'bg-orange-50 border border-orange-200'
                                }`}>
                                <p className={`text-sm font-semibold ${product.stock < 5 ? 'text-red-700' : 'text-orange-700'
                                    }`}>
                                    ⚠️ Only {product.stock} {product.stock === 1 ? 'item' : 'items'} left in stock!
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-10 flex flex-col gap-4 lg:flex-row">
                        <Button
                            size="lg"
                            className="flex-1 gap-2 bg-primary hover:bg-primary-600"
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                        >
                            <ShoppingBag className="h-5 w-5" />
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="flex-1"
                            onClick={handleBuyNow}
                            disabled={product.stock === 0}
                        >
                            {product.stock === 0 ? 'Out of Stock' : 'Buy Now'}
                        </Button>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-12 grid grid-cols-1 gap-6 border-t border-gray-200 pt-10 lg:grid-cols-3">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-6 w-6 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">2 Year Warranty</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Truck className="h-6 w-6 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">Free Shipping</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <RotateCcw className="h-6 w-6 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">30 Day Returns</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
