import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="border-t border-gray-100 bg-white py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="text-lg font-bold">STORE.</h3>
                        <p className="mt-4 text-sm text-gray-500">
                            Premium curated goods for the modern lifestyle.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-medium">Shop</h4>
                        <ul className="mt-4 space-y-2 text-sm text-gray-500">
                            <li>
                                <Link to="/products" className="hover:text-gray-900 transition-colors">
                                    All Products
                                </Link>
                            </li>
                            <li>New Arrivals</li>
                            <li>Best Sellers</li>
                            <li>Accessories</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium">Support</h4>
                        <ul className="mt-4 space-y-2 text-sm text-gray-500">
                            <li>FAQ</li>
                            <li>Shipping</li>
                            <li>Returns</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium">Connect</h4>
                        <ul className="mt-4 space-y-2 text-sm text-gray-500">
                            <li>Instagram</li>
                            <li>Twitter</li>
                            <li>Facebook</li>
                            <li className="pt-2">
                                <Link
                                    to="/admin/login"
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                                >
                                    <Lock className="h-3.5 w-3.5" />
                                    Admin Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-100 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} STORE. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
