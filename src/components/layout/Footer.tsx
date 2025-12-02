import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="border-t border-velora-muted bg-velora-bg py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <div className="inline-block bg-white p-2 rounded-lg shadow-sm">
                            <img src="/velora-logo.png" alt="Velora Bags" className="h-12 w-auto object-contain" />
                        </div>
                        <p className="mt-4 text-sm text-velora-text">
                            Premium handcrafted bags for the modern woman.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-serif font-semibold text-velora-dark">Shop</h4>
                        <ul className="mt-4 space-y-2 text-sm text-velora-text">
                            <li>
                                <Link to="/products" className="hover:text-velora transition-colors">
                                    All Products
                                </Link>
                            </li>
                            <li>New Arrivals</li>
                            <li>Best Sellers</li>
                            <li>Accessories</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-serif font-semibold text-velora-dark">Support</h4>
                        <ul className="mt-4 space-y-2 text-sm text-velora-text">
                            <li>FAQ</li>
                            <li>Shipping</li>
                            <li>Returns</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-serif font-semibold text-velora-dark">Connect</h4>
                        <ul className="mt-4 space-y-2 text-sm text-velora-text">
                            <li>Instagram</li>
                            <li>Twitter</li>
                            <li>Facebook</li>
                            <li className="pt-2">
                                <Link
                                    to="/admin/login"
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-velora px-3 py-2 text-sm font-medium text-white hover:bg-velora-dark transition-colors"
                                >
                                    <Lock className="h-3.5 w-3.5" />
                                    Admin Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-velora-muted pt-8 text-center text-sm text-velora-text">
                    <p>&copy; {new Date().getFullYear()} Velora Bags. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
