import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { CartItem } from '../../components/cart/CartItem';
import { Button } from '../../components/common/Button';

export const CartPage = () => {
    const { items, getCartTotal } = useCartStore();
    const navigate = useNavigate();
    const total = getCartTotal();

    if (items.length === 0) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your cart is empty</h2>
                <p className="mt-4 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
                <div className="mt-8">
                    <Link to="/products">
                        <Button>
                            Continue Shopping
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>

            <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                <div className="lg:col-span-7">
                    <div className="divide-y divide-gray-200 border-b border-t border-gray-200">
                        {items.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                    <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

                    <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <div className="text-base font-medium text-gray-900">Order total</div>
                            <div className="text-base font-medium text-gray-900">${total.toFixed(2)}</div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button
                            size="lg"
                            className="w-full bg-primary hover:bg-primary-600"
                            onClick={() => navigate('/checkout')}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>

                    <div className="mt-4 text-center">
                        <Link to="/products" className="text-sm text-primary-600 hover:text-primary-700">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
