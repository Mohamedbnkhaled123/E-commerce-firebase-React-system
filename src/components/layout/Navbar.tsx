import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { cn } from '../../utils/cn';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { items, toggleCart } = useCartStore();
    const location = useLocation();

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Shop' },
        { href: '/sales', label: 'Offers 🏷️', className: 'text-red-600 font-medium' },
        { href: '/about', label: 'About' },
    ];

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-velora-muted bg-white/90 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/velora-logo.png" alt="Velora Bags" className="h-16 w-auto object-contain" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className={cn(
                                        'text-sm font-medium transition-colors duration-200',
                                        location.pathname === link.href
                                            ? 'text-velora-dark border-b-2 border-velora'
                                            : 'text-velora-text hover:text-velora',
                                        link.className
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleCart}
                            className="relative rounded-full p-2 text-velora-text transition-colors hover:bg-velora-bg hover:text-velora-dark"
                        >
                            <ShoppingCart className="h-6 w-6" />
                            {cartCount > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-velora text-[10px] font-bold text-white animate-bounce-in">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="rounded-md p-2 text-velora-text hover:bg-velora-bg hover:text-velora-dark"
                            >
                                {isMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-velora-muted bg-white">
                    <div className="space-y-1 px-4 pb-4 pt-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={cn(
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                    location.pathname === link.href
                                        ? 'bg-velora-bg text-velora-dark'
                                        : 'text-velora-text hover:bg-velora-bg hover:text-velora-dark',
                                    link.className
                                )}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};
