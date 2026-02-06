import { Check } from 'lucide-react';
import type { Category } from '../../data/categories';

interface CategoryCardProps {
    category: Category;
    isSelected: boolean;
    onClick: (category: string) => void;
}

export const CategoryCard = ({ category, isSelected, onClick }: CategoryCardProps) => {
    return (
        <button
            onClick={() => onClick(category.name)}
            className={`group relative overflow-hidden rounded-lg aspect-video cursor-pointer transition-all ${isSelected
                ? 'ring-4 ring-velora shadow-xl'
                : 'hover:shadow-lg'
                }`}
        >
            {/* Background Image */}
            <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Dark Overlay */}
            <div
                className={`absolute inset-0 transition-colors ${isSelected
                    ? 'bg-velora/60'
                    : 'bg-black/40 group-hover:bg-black/50'
                    }`}
            />

            {/* Category Name */}
            <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg font-serif">
                    {category.name}
                </h3>
            </div>

            {/* Selected Indicator */}
            {isSelected && (
                <div className="absolute top-2 right-2">
                    <div className="rounded-full bg-white p-1 shadow-lg">
                        <Check className="h-5 w-5 text-velora" strokeWidth={3} />
                    </div>
                </div>
            )}
        </button>
    );
};
