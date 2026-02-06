import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductStore } from '../../store/useProductStore';
import { CATEGORIES } from '../../data/categories';
import { ProductCard } from '../../components/product/ProductCard';
import { SearchBar } from '../../components/common/SearchBar';
import { X } from 'lucide-react';
import { CategoryCard } from '../../components/product/CategoryCard';

export const ProductsPage = () => {
    const products = useProductStore((state) => state.products);
    // const categories = useProductStore((state) => state.categories); // Using static CATEGORIES instead
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
                    (product.category?.toLowerCase() ?? '').includes(query) ||
                    (product.description?.toLowerCase() ?? '').includes(query)
            );
        }

        return filtered;
    }, [products, searchQuery, selectedCategory]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 border-b border-velora-muted pb-6 lg:flex-row lg:items-center lg:justify-between">
                <h1 className="text-4xl font-serif font-bold tracking-tight text-velora-dark">All Products</h1>
                <SearchBar onSearch={handleSearch} placeholder="Search products..." />
            </div>

            {/* Active Filters */}
            {(searchQuery || selectedCategory) && (
                <div className="mt-6 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-velora-text">Active filters:</span>
                    {selectedCategory && (
                        <button
                            onClick={() => handleCategoryChange('')}
                            className="inline-flex items-center gap-1.5 rounded-full bg-velora/10 px-3 py-1 text-sm font-medium text-velora hover:bg-velora/20 transition-colors"
                        >
                            {selectedCategory}
                            <X className="h-3 w-3" />
                        </button>
                    )}
                    {searchQuery && (
                        <button
                            onClick={() => handleSearch('')}
                            className="inline-flex items-center gap-1.5 rounded-full bg-velora-muted px-3 py-1 text-sm font-medium text-velora-text hover:bg-velora-muted/80 transition-colors"
                        >
                            Search: "{searchQuery}"
                            <X className="h-3 w-3" />
                        </button>
                    )}
                </div>
            )}



            {/* Category Filters */}
            <div className="mt-8">
                <h2 className="text-2xl font-serif font-bold tracking-tight text-velora-dark mb-6">Shop by Category</h2>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                    {CATEGORIES.map((category) => (
                        <CategoryCard
                            key={category.id || category.name}
                            category={category}
                            isSelected={selectedCategory === category.name}
                            onClick={handleCategoryChange}
                        />
                    ))}
                </div>

                {/* Clear All Filters Button */}
                {selectedCategory && (
                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={() => handleCategoryChange('')}
                            className="inline-flex items-center gap-2 rounded-lg bg-velora-bg px-4 py-2 text-sm font-medium text-velora hover:bg-velora-muted transition-colors"
                        >
                            <X className="h-4 w-4" />
                            Clear Category Filter
                        </button>
                    </div>
                )}
            </div>

            {/* Results Count */}
            <div className="mt-6 text-sm text-velora-text">
                <p>
                    Found <span className="font-semibold text-velora-dark">{filteredProducts.length}</span>{' '}
                    {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-4 xl:gap-x-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="mt-16 flex flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-velora-bg p-6">
                        <svg
                            className="h-12 w-12 text-velora"
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
                    <h3 className="mt-4 text-lg font-serif font-semibold text-velora-dark">No products found</h3>
                    <p className="mt-2 text-sm text-velora-text">
                        Try adjusting your filters or search to find what you're looking for.
                    </p>
                </div>
            )}
        </div>
    );
};
