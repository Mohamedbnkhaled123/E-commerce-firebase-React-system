import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { Button } from '../../components/common/Button';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export const AdminDashboard = () => {
    const { products, isLoading } = useProductStore();
    const deleteProduct = useProductStore((state) => state.deleteProduct);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; productId: string | null }>({
        isOpen: false,
        productId: null,
    });

    const handleTestConnection = async () => {
        console.log('Testing connection...');
        try {
            const docRef = await addDoc(collection(db, "test_connection"), {
                timestamp: new Date(),
                device: navigator.userAgent
            });
            console.log("Document written with ID: ", docRef.id);
            alert("Success! Connection is working. ID: " + docRef.id);
        } catch (e: any) {
            console.error("Error adding document: ", e);
            alert("Error: " + e.message);
        }
    };

    const handleDeleteClick = (productId: string) => {
        setDeleteModal({ isOpen: true, productId });
    };

    const handleConfirmDelete = async () => {
        if (deleteModal.productId) {
            const idToDelete = deleteModal.productId;
            // Close modal immediately for better UX (optimistic UI)
            setDeleteModal({ isOpen: false, productId: null });

            try {
                await deleteProduct(idToDelete);
            } catch (error) {
                console.error('Failed to delete product:', error);
                // Improve error visibility if needed, but for now modal is closed
                alert('Failed to delete product. Please refresh and try again.');
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-velora" />
                    <p className="text-sm text-gray-500">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        className="gap-2 h-9 px-3 text-sm sm:h-11 sm:px-4 sm:text-base"
                        onClick={handleTestConnection}
                    >
                        Test Connection
                    </Button>
                    <Link to="/admin/products/new">
                        <Button className="gap-2 h-9 px-3 text-sm sm:h-11 sm:px-4 sm:text-base">
                            <Plus className="h-4 w-4" />
                            Add Product
                        </Button>
                    </Link>
                </div>
            </div>

            {products.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-lg font-medium text-gray-900">No products yet</p>
                    <p className="mt-1 text-sm text-gray-500">Get started by adding your first product</p>
                    <Link to="/admin/products/new" className="mt-4">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Product
                        </Button>
                    </Link>
                </div>
            ) : (
                <>
                    {/* Desktop View - Table */}
                    <div className="hidden lg:block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Product
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Price
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <ImageWithFallback
                                                        className="h-10 w-10 rounded-full object-cover"
                                                        src={product.image}
                                                        alt={product.name}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            ${product.price.toFixed(2)}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <Link to={`/admin/products/edit/${product.id}`}>
                                                    <button className="text-indigo-600 hover:text-indigo-900 p-1">
                                                        <Pencil className="h-4 w-4" />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteClick(product.id)}
                                                    className="text-red-600 hover:text-red-900 p-1"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View - Cards */}
                    <div className="grid grid-cols-1 gap-4 lg:hidden">
                        {products.map((product) => (
                            <div key={product.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="h-16 w-16 flex-shrink-0">
                                        <ImageWithFallback
                                            className="h-16 w-16 rounded-lg object-cover"
                                            src={product.image}
                                            alt={product.name}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-medium text-gray-900">{product.name}</h3>
                                                <span className="mt-1 inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                                                    {product.category}
                                                </span>
                                            </div>
                                            <p className="font-bold text-gray-900">${product.price.toFixed(2)}</p>
                                        </div>
                                        <div className="mt-4 flex justify-end gap-2">
                                            <Link to={`/admin/products/edit/${product.id}`} className="flex-1">
                                                <Button variant="secondary" size="sm" className="w-full gap-2">
                                                    <Pencil className="h-3 w-3" />
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="gap-2"
                                                onClick={() => handleDeleteClick(product.id)}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, productId: null })}
                onConfirm={handleConfirmDelete}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone."
                type="danger"
                confirmText="Delete"
            />
        </div>
    );
};
