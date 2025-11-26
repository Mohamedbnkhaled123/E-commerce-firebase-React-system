import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductStore } from '../../store/useProductStore';
import { ProductCard } from '../../components/product/ProductCard';
import { SearchBar } from '../../components/common/SearchBar';
import { X } from 'lucide-react';

export const ProductsPage = () => {
    const products = useProductStore((state) => state.products);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');

    // Update search query when URL parameter changes
    useEffect(() => {
        const query = searchParams.get('search') || '';
        const category = searchParams.get('category') || '';
        setSearchQuery(query);
        setSelectedCategory(category);
    }, [searchParams]);

    // Update URL when search query changes
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const params: Record<string, string> = {};
        if (query.trim()) params.search = query;
        if (selectedCategory) params.category = selectedCategory;
        setSearchParams(params);
    };

    // Handle category filter
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        const params: Record<string, string> = {};
        if (searchQuery.trim()) params.search = searchQuery;
        if (category) params.category = category;
        setSearchParams(params);
    };

    // Get unique categories
    const categories = useMemo(() => {
        return Array.from(new Set(products.map((p) => p.category)));
    }, [products]);

    // Filter products based on search query and category
    const filteredProducts = useMemo(() => {
        let filtered = products;

        // Filter by category
        if (selectedCategory) {
            filtered = filtered.filter((p) => p.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (product) =>
                    product.name.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [products, searchQuery, selectedCategory]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 border-b border-gray-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>
                <SearchBar onSearch={handleSearch} placeholder="Search products..." />
            </div>

            {/* Active Filters */}
            {(searchQuery || selectedCategory) && (
                <div className="mt-6 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Active filters:</span>
                    {selectedCategory && (
                        <button
                            onClick={() => handleCategoryChange('')}
                            className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 hover:bg-primary-200"
                        >
                            {selectedCategory}
                            <X className="h-3 w-3" />
                        </button>
                    )}
                    {searchQuery && (
                        <button
                            onClick={() => handleSearch('')}
                            className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 hover:bg-gray-200"
                        >
                            Search: "{searchQuery}"
                            <X className="h-3 w-3" />
                        </button>
                    )}
                </div>
            )}

            {/* Category Filters */}
            <div className="mt-6 flex flex-wrap gap-2">
                <button
                    onClick={() => handleCategoryChange('')}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${!selectedCategory
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    All Categories
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${selectedCategory === category
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Results Count */}
            <div className="mt-6 text-sm text-gray-600">
                <p>
                    Found <span className="font-semibold text-gray-900">{filteredProducts.length}</span>{' '}
                    {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>
            </div>

            {/* Products Grid */}
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
                        Try adjusting your filters or search to find what you're looking for.
                    </p>
                </div>
            )}
        </div>
    );
};
