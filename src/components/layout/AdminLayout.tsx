import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, ExternalLink } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { cn } from '../../utils/cn';

export const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const navItems = [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-velora-muted bg-white">
                <div className="flex h-20 items-center justify-between border-b border-velora-muted px-6">
                    <img src="/velora-logo.png" alt="Velora Bags" className="h-14 w-auto object-contain" />
                </div>
                <nav className="space-y-1 p-4">
                    {navItems.map((item) => {
                        const isActive = item.exact
                            ? location.pathname === item.href
                            : location.pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-velora text-white'
                                        : 'text-velora-text hover:bg-velora-bg'
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* View Store Button */}
                <div className="px-4 py-2">
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center gap-3 rounded-md bg-velora px-3 py-2 text-sm font-medium text-white hover:bg-velora-dark transition-colors"
                    >
                        <ExternalLink className="h-4 w-4" />
                        View Store
                    </a>
                </div>

                <div className="absolute bottom-0 w-full border-t border-velora-muted p-4">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="pl-64">
                <div className="mx-auto max-w-7xl p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
