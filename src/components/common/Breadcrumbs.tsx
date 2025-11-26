import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link
                to="/"
                className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors"
            >
                <Home className="h-4 w-4" />
                <span>Home</span>
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                    {item.href && index < items.length - 1 ? (
                        <Link
                            to={item.href}
                            className="text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-medium text-gray-900">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
};
