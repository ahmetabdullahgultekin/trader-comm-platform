import React, {useState} from 'react';
import {ChevronLeft, ChevronRight, Eye, Heart, MapPin, MessageCircle, Phone, Share2, User} from 'lucide-react';
import type {Product} from '../../types';
import {useTranslation} from '../../hooks';

interface ProductCardProps {
    product: Product;
    onViewDetails: (product: Product) => void;
    isFavorite: boolean;
    onToggleFavorite: (productId: number) => void;
    onShare?: (product: Product) => void;
    onContact?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                     product,
                                                     onViewDetails,
                                                     isFavorite,
                                                     onToggleFavorite,
                                                     onShare,
                                                     onContact
                                                 }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

    return (
        <div
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 group"
            onClick={() => onViewDetails(product)}
        >
            {/* Image Section */}
            <div className="relative">
                <div className="aspect-w-16 aspect-h-12 bg-gray-200 relative overflow-hidden">
                    <img
                        src={product.images[currentImageIndex]}
                        alt={product.title[language]}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            // Fallback image if image fails to load
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80';
                        }}
                    />

                    {/* Image Navigation */}
                    {product.images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                            >
                                <ChevronLeft className="w-4 h-4"/>
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                            >
                                <ChevronRight className="w-4 h-4"/>
                            </button>

                            {/* Image Indicators */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                                {product.images.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-colors ${
                                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                        }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex(index);
                                        }}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    {product.featured && (
                        <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-lg">
              ⭐ Featured
            </span>
                    )}
                    {product.badge === 'new' && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-lg">
              {t('products.new')}
            </span>
                    )}
                    {product.badge === 'sale' && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-lg">
              {t('products.sale')}
            </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div
                    className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleToggleFavorite}
                        className={`p-2 rounded-full transition-colors ${
                            isFavorite
                                ? 'bg-red-500 text-white'
                                : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500'
                        }`}
                        title={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                    >
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`}/>
                    </button>
                    {onShare && (
                        <button
                            onClick={handleShare}
                            className="p-2 bg-white/90 text-gray-600 rounded-full hover:bg-blue-50 hover:text-blue-500 transition-colors"
                            title="Paylaş"
                        >
                            <Share2 className="w-4 h-4"/>
                        </button>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.title[language]}
                    </h3>
                    <p className="text-2xl font-bold text-blue-600 mb-1">
                        {product.priceText}
                    </p>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 mr-1"/>
                    <span>{product.location[language]}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description[language]}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                    {product.features[language].slice(0, 3).map((feature, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                        >
              {feature}
            </span>
                    ))}
                    {product.features[language].length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
              +{product.features[language].length - 3}
            </span>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-1"/>
                        <span>{product.seller}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <Eye className="w-4 h-4 mr-1"/>
                        <span>{product.views} {t('products.views')}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                    <button
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(product);
                        }}
                    >
                        {t('products.details')}
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                        {onContact && (
                            <button
                                onClick={handleContact}
                                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center justify-center space-x-1"
                            >
                                <Phone className="w-3 h-3"/>
                                <span>Ara</span>
                            </button>
                        )}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                const message = encodeURIComponent(`Merhaba, ${product.title[language]} hakkında bilgi almak istiyorum.`);
                                window.open(`https://wa.me/905321234567?text=${message}`, '_blank');
                            }}
                            className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm flex items-center justify-center space-x-1"
                        >
                            <MessageCircle className="w-3 h-3"/>
                            <span>WhatsApp</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
