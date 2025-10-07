import React, {useEffect, useState} from 'react';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import {ArrowLeft, Grid as GridIcon, List, SlidersHorizontal} from 'lucide-react';
import {useProducts, useTranslation} from '../hooks';
import {useFahriErenConfig} from '../hooks/useFahriErenConfig';
import {PhoneType} from '../types/enums';
import SEO from '../components/common/SEO';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductsPage: React.FC = () => {
    const {category} = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const {t, language} = useTranslation();
    const config = useFahriErenConfig();
    const {products, loading, error, updateFilters, clearFilters, filters, favorites, toggleFavorite} = useProducts();

    // UI State
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);

    // Filter by category if provided
    useEffect(() => {
        if (category && category !== 'all') {
            updateFilters({category});
        }
    }, [category, updateFilters]);

    // Map Turkish URL categories to English product categories
    const mapCategory = (kategori: string | null): string => {
        const mapping: Record<string, string> = {
            'emlak': 'realestate',
            'arac': 'vehicles',
            'tarim': 'farm',
            'insaat': 'construction'
        };
        return kategori ? (mapping[kategori] || kategori) : 'all';
    };

    // Initialize filters from URL params
    useEffect(() => {
        const search = searchParams.get('search');
        const kategori = searchParams.get('kategori');
        const sortBy = searchParams.get('sort');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');

        const newFilters: any = {};

        if (search) {
            newFilters.searchQuery = search;
        }
        if (kategori) {
            newFilters.category = mapCategory(kategori);
        }
        if (sortBy) {
            newFilters.sortBy = sortBy;
        }
        if (minPrice || maxPrice) {
            newFilters.priceRange = {
                min: minPrice || '',
                max: maxPrice || ''
            };
        }

        if (Object.keys(newFilters).length > 0) {
            updateFilters(newFilters);
        }
    }, [searchParams, updateFilters]);

    const getCategoryTitle = () => {
        switch (category) {
            case 'emlak':
                return t('categories.realestate');
            case 'arac':
                return t('categories.vehicles');
            case 'tarim':
                return t('categories.agriculture');
            case 'insaat':
                return t('categories.construction');
            default:
                return t('products.title');
        }
    };

    // Handlers
    const handleViewDetails = (product: any) => {
        navigate(`/urunler/${product.id}`);
    };

    const handleContact = () => {
        window.open(config.config.contact.phoneUri(PhoneType.PRIMARY), '_self');
    };

    const handleShare = (product: any) => {
        if (navigator.share) {
            navigator.share({
                title: product.title[language],
                text: product.description[language],
                url: window.location.origin + `/urunler/${product.id}`
            });
        } else {
            // Fallback to copying URL
            navigator.clipboard.writeText(window.location.origin + `/urunler/${product.id}`);
        }
    };

    // Loading state
    if (loading) {
        return (
            <>
                <SEO
                    title={t('products.title')}
                    description={t('products.description')}
                />
                <LoadingSpinner message="Ürünler yükleniyor..." size="lg"/>
            </>
        );
    }

    return (
        <>
            <SEO
                title={t('products.title')}
                description={t('products.description')}
            />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4"/>
                        {t('common.goBack')}
                    </button>

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {getCategoryTitle()}
                            </h1>
                            <p className="text-gray-600">
                                {products.length > 0
                                    ? `${products.length} ${t('products.found')}`
                                    : t('products.description')
                                }
                            </p>
                        </div>

                        {/* View Toggle & Filter Toggle */}
                        <div className="flex items-center gap-3 mt-4 lg:mt-0">
                            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-colors ${
                                        viewMode === 'grid'
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    <GridIcon className="w-4 h-4"/>
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-colors ${
                                        viewMode === 'list'
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    <List className="w-4 h-4"/>
                                </button>
                            </div>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <SlidersHorizontal className="w-4 h-4"/>
                                {t('filters.title')}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-80 flex-shrink-0">
                        <ProductFilters
                            filters={filters}
                            onUpdateFilters={updateFilters}
                            onClearFilters={clearFilters}
                            showFilters={showFilters}
                            onToggleFilters={() => setShowFilters(!showFilters)}
                        />
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className={`grid gap-6 ${
                                viewMode === 'grid'
                                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                                    : 'grid-cols-1'
                            }`}>
                                {[...Array(9)].map((_, index) => (
                                    <div
                                        key={index}
                                        className={`bg-gray-100 animate-pulse rounded-lg ${
                                            viewMode === 'grid' ? 'h-80' : 'h-48'
                                        }`}
                                    />
                                ))}
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                                <h2 className="text-xl font-semibold text-red-700 mb-2">
                                    {t('common.error')}
                                </h2>
                                <p className="text-red-600 mb-6">
                                    {error}
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                >
                                    {t('common.tryAgain')}
                                </button>
                            </div>
                        ) : products.length > 0 ? (
                            <div className={`grid gap-6 ${
                                viewMode === 'grid'
                                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                                    : 'grid-cols-1'
                            }`}>
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onViewDetails={handleViewDetails}
                                        isFavorite={favorites.includes(product.id)}
                                        onToggleFavorite={toggleFavorite}
                                        onShare={handleShare}
                                        onContact={handleContact}
                                        viewMode={viewMode}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                                <GridIcon className="w-16 h-16 text-gray-400 mx-auto mb-4"/>
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                    {t('products.comingSoon')}
                                </h2>
                                <p className="text-gray-500 mb-6">
                                    {t('products.comingSoonDesc')}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={() => window.open(config.contact.phoneUri(PhoneType.PRIMARY), '_self')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                    >
                                        {t('contact.callNow')}
                                    </button>
                                    <button
                                        onClick={() => window.open(config.contact.whatsappUrl(), '_blank')}
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                    >
                                        WhatsApp
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductsPage;
