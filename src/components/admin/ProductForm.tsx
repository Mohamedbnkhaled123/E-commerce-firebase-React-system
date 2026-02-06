import React, { useEffect, useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { ConfirmationModal } from '../common/ConfirmationModal';

interface ProductFormProps {
    initialData?: Partial<Product>;
    onSubmit: (data: Omit<Product, 'id'>) => Promise<void>;
    title: string;
}

export const ProductForm = ({ initialData, onSubmit, title }: ProductFormProps) => {
    const navigate = useNavigate();
    const [hasDiscount, setHasDiscount] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    // Category management
    const { categories, addCategory } = useProductStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;

        // Add new category
        const newId = await addCategory({
            name: newCategoryName,
            image: '/velora-logo.png', // Default placeholder
            isActive: true,
            id: '' // Will be replaced by Firestore ID
        });

        // Select the new category
        setFormData(prev => ({
            ...prev,
            categoryId: newId,
            category: newCategoryName
        }));

        // Reset state
        setNewCategoryName('');
        setIsAddingCategory(false);
    };

    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        price: initialData?.price || '',
        originalPrice: initialData?.originalPrice || '',
        categoryId: initialData?.categoryId || '',
        category: initialData?.category || '',
        image: initialData?.image || '',
        description: initialData?.description || '',
        stock: initialData?.stock || '',
        isActive: initialData?.isActive ?? true,
    });

    // Initialize hasDiscount based on initialData
    useEffect(() => {
        if (initialData?.originalPrice && initialData.originalPrice > (initialData.price || 0)) {
            setHasDiscount(true);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // ... (validation logic same)
        setShowConfirmModal(true);
    };

    const handleConfirmSubmit = async () => {
        // Prevent double execution
        if (isSubmitting) {
            return;
        }

        const price = Number(formData.price);
        const originalPrice = hasDiscount ? Number(formData.originalPrice) : undefined;

        setIsSubmitting(true);
        setShowConfirmModal(false);

        try {
            await onSubmit({
                name: formData.name,
                price: price,
                originalPrice: originalPrice,
                categoryId: formData.categoryId,
                category: formData.category,
                image: formData.image,
                description: formData.description,
                stock: Number(formData.stock) || 0,
                isActive: formData.isActive,
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            setIsSubmitting(false);
            alert('Failed to save product. Please try again.');
        }
    };

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">{title}</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <Input
                    label="Product Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />

                {/* Price Section */}
                <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="hasDiscount"
                            checked={hasDiscount}
                            onChange={(e) => setHasDiscount(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="hasDiscount" className="text-sm font-medium text-gray-900">
                            This product is on sale 🏷️
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {hasDiscount && (
                            <Input
                                label="Original Price"
                                type="number"
                                step="0.01"
                                value={formData.originalPrice}
                                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                required={hasDiscount}
                                placeholder="0.00"
                            />
                        )}
                        <Input
                            label={hasDiscount ? "Sale Price (New)" : "Price"}
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                            placeholder="0.00"
                            className={hasDiscount ? "text-red-600 font-medium" : ""}
                        />
                    </div>
                    {hasDiscount && formData.originalPrice && formData.price && (
                        <p className="text-sm text-green-600">
                            Discount: {Math.round(((Number(formData.originalPrice) - Number(formData.price)) / Number(formData.originalPrice)) * 100)}% OFF
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900">
                        Category
                    </label>
                    <div className="relative">
                        <button
                            type="button"
                            className="flex h-11 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <span className={formData.category ? 'text-gray-900' : 'text-gray-500'}>
                                {formData.category || 'Select a category'}
                            </span>
                            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg animate-fade-in">
                                <div className="max-h-60 overflow-auto">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id || cat.name}
                                            type="button"
                                            className="w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors duration-500 hover:bg-gray-200 hover:text-gray-900"
                                            onClick={() => {
                                                setFormData({
                                                    ...formData,
                                                    categoryId: cat.id,
                                                    category: cat.name
                                                });
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                                <div className="border-t border-gray-100 bg-gray-50 p-2">
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-velora border border-gray-200 shadow-sm transition-all hover:bg-velora hover:text-white hover:border-velora"
                                        onClick={() => {
                                            setIsAddingCategory(true);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add New Category
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {isAddingCategory && (
                        <div className="mt-4 rounded-lg bg-gray-50 p-4 border border-gray-200 animation-fade-in">
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Add New Category</h4>
                            <div className="flex gap-2">
                                <Input
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    placeholder="Category Name"
                                    className="bg-white"
                                />
                                <Button
                                    type="button"
                                    onClick={handleAddCategory}
                                    disabled={!newCategoryName.trim()}
                                >
                                    Add
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => {
                                        setIsAddingCategory(false);
                                        setNewCategoryName('');
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <Input
                    label="Image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                />

                <Input
                    label="Stock Quantity"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                    placeholder="0"
                />

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                        Description
                    </label>
                    <textarea
                        className="flex min-h-[120px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </div>
                <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save Product'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => navigate('/admin')} disabled={isSubmitting}>
                        Cancel
                    </Button>
                </div>
            </form>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleConfirmSubmit}
                title={initialData ? "Update Product" : "Create Product"}
                message={`Are you sure you want to ${initialData ? "update" : "create"} this product?`}
                type="info"
                confirmText={initialData ? "Update" : "Create"}
            />

            {/* Error Modal */}
            <ConfirmationModal
                isOpen={showErrorModal}
                onClose={() => setShowErrorModal(false)}
                onConfirm={() => setShowErrorModal(false)}
                title="Invalid Price"
                message="Sale price must be lower than the original price."
                type="danger"
                confirmText="OK"
                showCancelButton={false}
            />
        </div>
    );
};
