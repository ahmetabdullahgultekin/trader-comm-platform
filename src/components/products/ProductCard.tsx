import React, {useState} from 'react';
import {ChevronLeft, ChevronRight, Eye, Heart, Phone, Share2, Star} from 'lucide-react';
import type {Product} from '../../types';
import {useTranslation} from '../../hooks';

interface ProductCardProps {
    product: Product;
    onViewDetails: (product: Product) => void;
    isFavorite: boolean;
    onToggleFavorite: (productId: string) => void;
    onShare?: (product: Product) => void;
    onContact?: () => void;
    viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                     product,
                                                     onViewDetails,
                                                     isFavorite,
                                                     onToggleFavorite,
                                                     onShare,
                                                     onContact,
                                                     viewMode = 'grid'
                                                 }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageError, setImageError] = useState(false);
    const {language, t} = useTranslation();

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleFavorite(product.id);
    };

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onShare) {
            onShare(product);
        }
    };

    const handleContact = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onContact) {
            onContact();
        }
    };

    const handleImageError = () => {
        console.error('Image load error for product:', product.id, product.images[currentImageIndex]);
        setImageError(true);
    };

    const placeholderImage = 'https://via.placeholder.com/400x300/e5e7eb/6b7280?text=Resim+Yüklenemedi';

    const currentImage = product.images[currentImageIndex] || '/images/product-placeholder.svg';
    const displayImage = imageError ? '/images/product-placeholder.svg' : currentImage;

    const formatPrice = (price: number, currency: string) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: currency === 'USD' ? 'USD' : 'TRY'
        }).format(price);
    };

    const renderStars = (rating: number) => {
        return Array.from({length: 5}, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${
                    i < Math.floor(rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                }`}
            />
        ));
    };

    if (viewMode === 'list') {
        return (
            <div
                className="card p-6 cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6"
                onClick={() => onViewDetails(product)}
            >
                {/* Image Section */}
                <div className="relative w-full md:w-48 h-48 md:h-32 flex-shrink-0">
                    <img
                        src={displayImage}
                        alt={product.title[language]}
                        className="w-full h-full object-cover rounded-lg"
                        onError={handleImageError}
                    />

                    {product.images.length > 1 && !imageError && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4"/>
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
                            >
                                <ChevronRight className="w-4 h-4"/>
                            </button>
                        </>
                    )}

                    {/* Favorite Button */}
                    <button
                        onClick={handleToggleFavorite}
                        className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
                    >
                        <Heart
                            className={`w-4 h-4 ${
                                isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'
                            }`}
                        />
                    </button>
                </div>

                {/* Content Section */}
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                            {product.title[language]}
                        </h3>
                        <div className="text-right flex-shrink-0 ml-4">
                            <p className="text-2xl font-bold text-primary-600">
                                {formatPrice(product.price, product.currency)}
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                        {product.description[language]}
                    </p>

                    <div className="flex items-center gap-4 mb-4">
                        {product.rating && (
                            <div className="flex items-center gap-1">
                                <div className="flex">
                                    {renderStars(product.rating)}
                                </div>
                                <span className="text-sm text-gray-600">
                                    ({product.reviews || 0})
                                </span>
                            </div>
                        )}

                        <div className="flex items-center text-sm text-gray-500">
                            <Eye className="w-4 h-4 mr-1"/>
                            <span>{product.views || 0} {t('products.viewCount')}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <button
                            onClick={() => onViewDetails(product)}
                            className="btn-primary"
                        >
                            {t('products.detailsView')}
                        </button>

                        <button
                            onClick={handleContact}
                            className="btn-secondary flex items-center space-x-1"
                        >
                            <Phone className="w-4 h-4"/>
                            <span>{t('products.call')}</span>
                        </button>

                        <button
                            onClick={handleShare}
                            className="btn-secondary flex items-center space-x-1"
                        >
                            <Share2 className="w-4 h-4"/>
                            <span>{t('products.share')}</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Grid view (default)
    return (
        <div
            className="card overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group"
            onClick={() => onViewDetails(product)}
        >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={displayImage}
                    alt={product.title[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={handleImageError}
                />

                {product.images.length > 1 && !imageError && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <ChevronLeft className="w-4 h-4"/>
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <ChevronRight className="w-4 h-4"/>
                        </button>
                    </>
                )}

                {/* Favorite Button */}
                <button
                    onClick={handleToggleFavorite}
                    className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
                >
                    <Heart
                        className={`w-4 h-4 ${
                            isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'
                        }`}
                    />
                </button>

                {/* Stock Status */}
                <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        product.inStock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}>
                        {product.inStock ? t('products.inStock') : t('products.outOfStock')}
                    </span>
                </div>

                {/* Image indicators */}
                {product.images.length > 1 && !imageError && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {product.images.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${
                                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                        {product.title[language]}
                    </h3>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {product.description[language]}
                </p>

                <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-primary-600">
                        {formatPrice(product.price, product.currency)}
                    </div>

                    {product.rating && (
                        <div className="flex items-center gap-1">
                            <div className="flex">
                                {renderStars(product.rating)}
                            </div>
                            <span className="text-sm text-gray-600">
                                ({product.reviews || 0})
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Eye className="w-4 h-4 mr-1"/>
                    <span>{product.views || 0} {t('products.viewCount')}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => onViewDetails(product)}
                        className="flex-1 btn-primary text-sm"
                    >
                        {t('products.detailsView')}
                    </button>

                    <button
                        onClick={handleContact}
                        className="p-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors"
                        title={t('products.call')}
                    >
                        <Phone className="w-4 h-4"/>
                    </button>

                    <button
                        onClick={handleShare}
                        className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                        title={t('products.share')}
                    >
                        <Share2 className="w-4 h-4"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
