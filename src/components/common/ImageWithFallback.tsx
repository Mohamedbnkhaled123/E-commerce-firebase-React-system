import { useState, type ImgHTMLAttributes } from 'react';
import { ImageOff } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
    fallbackClassName?: string;
}

export const ImageWithFallback = ({
    src,
    alt,
    className,
    fallbackClassName,
    ...props
}: ImageWithFallbackProps) => {
    const [error, setError] = useState(false);

    if (error || !src) {
        return (
            <div
                className={twMerge(
                    'flex h-full w-full items-center justify-center bg-gray-100 text-gray-400',
                    className,
                    fallbackClassName
                )}
            >
                <ImageOff className="h-1/3 w-1/3" />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            {...props}
        />
    );
};
