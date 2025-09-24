import React from 'react';
import {Filter, Search, SlidersHorizontal, X} from 'lucide-react';
import {FilterOptions, ProductCategory, SortOption} from '../../types';
import {useTranslation} from '../../hooks';

interface ProductFiltersProps {
    filters: FilterOptions;
    onUpdateFilters: (filters: Partial<FilterOptions>) => void;
    onClearFilters: () => void;
    showFilters: boolean;
    onToggleFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
                                                           filters,
                                                           onUpdateFilters,
                                                           onClearFilters,
                                                           showFilters,
                                                           onToggleFilters
                                                       }) => {
    const {t} = useTranslation();

    const categories: { value: ProductCategory | 'all'; label: string }[] = [
        {value: 'all', label: t('categories.all')},
        {value: 'realestate', label: t('categories.realestate')},
        {value: 'vehicles', label: t('categories.vehicles')},
        {value: 'construction', label: t('categories.construction')},
        {value: 'farm', label: t('categories.farm')}
    ];

    const sortOptions: { value: SortOption; label: string }[] = [
        {value: 'newest', label: t('filters.newest')},
        {value: 'oldest', label: t('filters.oldest')},
        {value: 'priceLow', label: t('filters.priceLow')},
        {value: 'priceHigh', label: t('filters.priceHigh')},
        {value: 'popular', label: t('filters.popular')}
    ];

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Filter Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <Filter className="w-5 h-5 text-gray-600"/>
                    <h3 className="text-lg font-semibold text-gray-900">{t('filters.title')}</h3>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={onClearFilters}
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        {t('filters.clear')}
                    </button>
                    <button
                        onClick={onToggleFilters}
                        className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
                    >
                        {showFilters ? <X className="w-5 h-5"/> : <SlidersHorizontal className="w-5 h-5"/>}
                    </button>
                </div>
            </div>

            {/* Filter Content */}
            <div className={`p-6 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('hero.search')}
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"/>
                        <input
                            type="text"
                            value={filters.searchQuery}
                            onChange={(e) => onUpdateFilters({searchQuery: e.target.value})}
                            placeholder={t('hero.search')}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Category Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        {t('filters.category')}
                    </label>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <label key={category.value} className="flex items-center">
                                <input
                                    type="radio"
                                    name="category"
                                    value={category.value}
                                    checked={filters.category === category.value}
                                    onChange={(e) => onUpdateFilters({category: e.target.value as ProductCategory | 'all'})}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">{category.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        {t('filters.priceRange')}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <input
                                type="number"
                                value={filters.priceRange.min}
                                onChange={(e) => onUpdateFilters({
                                    priceRange: {...filters.priceRange, min: e.target.value}
                                })}
                                placeholder={t('filters.min')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                value={filters.priceRange.max}
                                onChange={(e) => onUpdateFilters({
                                    priceRange: {...filters.priceRange, max: e.target.value}
                                })}
                                placeholder={t('filters.max')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Sort By */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('filters.sortBy')}
                    </label>
                    <select
                        value={filters.sortBy}
                        onChange={(e) => onUpdateFilters({sortBy: e.target.value as SortOption})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Apply Button (Mobile) */}
                <div className="lg:hidden pt-4 border-t border-gray-200">
                    <button
                        onClick={onToggleFilters}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        {t('filters.apply')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductFilters;
