import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, User, Mail, Phone, Lock } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export const CheckoutPage = () => {
    const { items, getCartTotal, clearCart } = useCartStore();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const total = getCartTotal();

    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',

        // Shipping Address
        address: '',
        city: '',
        state: '',
        zipCode: '',

        // Payment Information
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate order processing
        setTimeout(() => {
            clearCart();
            showToast('success', 'Order placed successfully! 🎉');
            navigate('/');
        }, 1000);
    };

    if (items.length === 0) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
                <p className="mt-4 text-gray-500">Add some products to checkout.</p>
                <Button className="mt-8" onClick={() => navigate('/products')}>
                    Continue Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

            <form onSubmit={handleSubmit} className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
                {/* Left Column - Forms */}
                <div className="lg:col-span-7">
                    {/* Personal Information */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                            <User className="h-5 w-5 text-primary" />
                            <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Input
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="sm:col-span-2"
                            />
                            <Input
                                label="Phone"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className="sm:col-span-2"
                            />
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                            <MapPin className="h-5 w-5 text-primary" />
                            <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Input
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                className="sm:col-span-2"
                            />
                            <Input
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                label="State / Province"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                label="ZIP / Postal Code"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                required
                                className="sm:col-span-2"
                            />
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                            <CreditCard className="h-5 w-5 text-primary" />
                            <h2 className="text-lg font-semibold text-gray-900">Payment Information</h2>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Input
                                label="Card Number"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                placeholder="1234 5678 9012 3456"
                                required
                                className="sm:col-span-2"
                            />
                            <Input
                                label="Cardholder Name"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleInputChange}
                                required
                                className="sm:col-span-2"
                            />
                            <Input
                                label="Expiry Date"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                required
                            />
                            <Input
                                label="CVV"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                placeholder="123"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="mt-10 lg:col-span-5 lg:mt-0">
                    <div className="sticky top-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-4">
                            Order Summary
                        </h2>

                        {/* Products */}
                        <div className="mt-6 space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-16 w-16 rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                        <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-gray-900">${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="text-gray-900">Free</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Tax</span>
                                <span className="text-gray-900">${(total * 0.1).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-semibold">
                                <span className="text-gray-900">Total</span>
                                <span className="text-gray-900">${(total * 1.1).toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6">
                            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary-600">
                                <Lock className="mr-2 h-5 w-5" />
                                Place Order
                            </Button>
                            <p className="mt-3 text-center text-xs text-gray-500">
                                Your payment information is secure and encrypted
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
