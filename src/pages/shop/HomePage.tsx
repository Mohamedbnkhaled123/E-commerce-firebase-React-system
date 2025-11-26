import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useProductStore } from '../../store/useProductStore';
import { ProductCard } from '../../components/product/ProductCard';
import { Button } from '../../components/common/Button';
import { SearchBar } from '../../components/common/SearchBar';

export const HomePage = () => {
    const products = useProductStore((state) => state.products);
    const [searchQuery, setSearchQuery] = useState('');

    const featuredProducts = products.slice(0, 4);

    const categories = [
        { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80' },
        { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80' },
        { name: 'Furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
    ];

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // Filter products based on search query
    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) return [];

        const query = searchQuery.toLowerCase();
        return products.filter(
            (product) =>
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
        );
    }, [products, searchQuery]);

    return (
        <div className="space-y-16 pb-16">
            {/* Hero Section */}
            <section className="relative bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
                        alt="Background"
                        className="h-full w-full object-cover object-center opacity-30"
                    />
                </div>
                <div className="relative mx-auto max-w-2xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Elevate Your Lifestyle
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Discover our curated collection of premium goods designed to enhance your everyday life. Quality, style, and functionality in perfect harmony.
                    </p>

                    {/* Search Bar */}
                    <div className="mt-10 flex justify-center">
                        <div className="w-full max-w-lg">
                            <SearchBar
                                onSearch={handleSearch}
                                placeholder="Search for products..."
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-x-6">
                        <Link to="/products">
                            <Button size="lg" className="gap-2 bg-primary hover:bg-primary-600">
                                Shop Now <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Conditional Rendering: Search Results OR Categories/Trending */}
            {searchQuery ? (
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-6">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Search Results for "{searchQuery}"
                        </h2>
                        <span className="text-sm text-gray-500">
                            Found {filteredProducts.length} results
                        </span>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-16 flex flex-col items-center justify-center text-center">
                            <div className="rounded-full bg-gray-100 p-6">
                                <svg
                                    className="h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-gray-900">No products found</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Try adjusting your search to find what you're looking for.
                            </p>
                        </div>
                    )}
                </section>
            ) : (
                <>
                    {/* Featured Categories */}
                    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop by Category</h2>
                        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                            {categories.map((category) => (
                                <Link
                                    key={category.name}
                                    to={`/products?category=${encodeURIComponent(category.name)}`}
                                    className="group relative overflow-hidden rounded-lg aspect-video cursor-pointer"
                                >
                                    {/* Background Image */}
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />

                                    {/* Dark Overlay */}
                                    <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />

                                    {/* Category Name */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                                            {category.name}
                                        </h3>
                                    </div>

                                    {/* Hover Arrow */}
                                    <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                                        <div className="rounded-full bg-white p-2 shadow-lg">
                                            <ArrowRight className="h-5 w-5 text-gray-900" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Trending Products */}
                    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Trending Now</h2>
                            <Link to="/products" className="text-sm font-medium text-black hover:underline">
                                View all
                            </Link>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};
