import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { Button } from '../common/Button';
import { cn } from '../../utils/cn';

export const CartDrawer = () => {
    const { items, isOpen, toggleCart, updateQuantity, removeFromCart, getCartTotal } = useCartStore();
    const navigate = useNavigate();
    const total = getCartTotal();

    const handleCheckout = () => {
        toggleCart();
        navigate('/checkout');
    };

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 transition-opacity animate-fade-in"
                    onClick={toggleCart}
                />
            )}

            {/* Drawer */}
            <div
                className={cn(
                    'fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col',
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5" />
                        <h2 className="text-lg font-semibold text-gray-900">
                            Shopping Cart ({items.reduce((acc, item) => acc + item.quantity, 0)})
                        </h2>
                    </div>
                    <button
                        onClick={toggleCart}
                        className="rounded-lg p-2 hover:bg-gray-100"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <ShoppingBag className="h-12 w-12 text-gray-300" />
                            <p className="mt-4 text-sm font-medium text-gray-900">Your cart is empty</p>
                            <p className="mt-1 text-sm text-gray-500">Start adding some products!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                                <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between">
                                            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="rounded p-0.5 hover:bg-gray-100"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="rounded p-0.5 hover:bg-gray-100"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <p className="text-sm font-semibold text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-gray-200 px-6 py-4">
                        <div className="mb-4 flex items-center justify-between">
                            <span className="text-base font-medium text-gray-900">Subtotal</span>
                            <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Button
                                size="lg"
                                className="w-full"
                                onClick={handleCheckout}
                            >
                                Checkout
                            </Button>
                            <Link to="/cart" onClick={toggleCart}>
                                <Button size="lg" variant="outline" className="w-full">
                                    View Full Cart
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
