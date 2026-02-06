import { useProductStore } from '../../store/useProductStore';
import { ProductCard } from '../../components/product/ProductCard';
import { Tag } from 'lucide-react';

export const SalesPage = () => {
    const products = useProductStore((state) => state.products);

    // Filter products that have a discount (originalPrice > price)
    const saleProducts = products.filter(
        (product) => product.originalPrice && product.originalPrice > product.price
    );

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4">
                    <Tag className="h-8 w-8 text-red-600" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Special Offers 🏷️
                </h1>
                <p className="mt-4 text-lg text-gray-500 max-w-2xl">
                    Grab these amazing deals before they're gone! Limited time discounts on our premium collection.
                </p>
            </div>

            {saleProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-4 xl:gap-x-8">
                    {saleProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="mt-16 flex flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-gray-100 p-6">
                        <Tag className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">No active offers</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Check back later for new deals and discounts!
                    </p>
                </div>
            )}
        </div>
    );
};
