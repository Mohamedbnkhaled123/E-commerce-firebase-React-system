import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: 'bg-velora text-white hover:bg-velora-dark active:bg-[#5A4122] shadow-sm hover:shadow-md',
            secondary: 'bg-white text-velora border border-velora hover:bg-velora-bg shadow-sm',
            danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
            outline: 'border-2 border-velora-muted bg-transparent hover:border-velora text-velora-text hover:text-velora',
            ghost: 'bg-transparent hover:bg-velora-bg text-velora-text',
        };

        const sizes = {
            sm: 'h-9 px-3 text-sm',
            md: 'h-11 px-4 text-base',
            lg: 'h-12 px-6 text-base',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velora-light focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';
