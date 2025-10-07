import React, {useState} from 'react';
import {
    Award,
    Camera,
    ChevronLeft,
    ChevronRight,
    Clock,
    Download,
    Heart,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Share2,
    Star,
    User,
    X
} from 'lucide-react';
import type {Product} from '../../types';
import {useSEO, useTranslation} from '../../hooks';
import analyticsService from '../../services/analyticsService';

interface ProductDetailProps {
    product: Product;
    onBack: () => void;
    onToggleFavorite: (productId: string) => void;
    isFavorite: boolean;
    similarProducts: Product[];
    onViewProduct: (product: Product) => void;
    onCall?: () => void;
    onWhatsApp?: () => void;
    onEmail?: () => void;
    onRefresh?: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
                                                         product,
                                                         onBack,
                                                         onToggleFavorite,
                                                         isFavorite,
                                                         similarProducts,
                                                         onViewProduct,
                                                         onCall,
                                                         onWhatsApp,
                                                         onEmail,
                                                         onRefresh
                                                     }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showImageModal, setShowImageModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'description' | 'features' | 'seller'>('description');
    const {language, t} = useTranslation();
    const {updateProductSEO} = useSEO('product-detail');

    // Update SEO for this product and track view
    React.useEffect(() => {
        updateProductSEO(product);
        // Track product view for analytics (only in production)
        if (import.meta.env.PROD) {
            analyticsService.trackProductView(product.id);
        }
    }, [product, updateProductSEO]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.title[language],
                text: product.description[language],
                url: window.location.href
            });
        } else {
            // Fallback - copy to clipboard
            const url = `${window.location.origin}?product=${product.id}`;
            navigator.clipboard.writeText(url).then(() => {
                alert(language === 'tr' ? 'Link kopyalandı!' : 'Link copied!');
            });
        }
    };

    const handleCallSeller = () => {
        if (onCall) {
            onCall();
        } else {
            window.open('tel:+905321234567', '_self');
        }
    };

    const handleWhatsAppSeller = () => {
        const message = encodeURIComponent(`Merhaba, ${product.title[language]} hakkında bilgi almak istiyorum. Fiyat: ${product.priceText}`);
        if (onWhatsApp) {
            onWhatsApp();
        } else {
            window.open(`https://wa.me/905321234567?text=${message}`, '_blank');
        }
    };

    const handleEmailSeller = () => {
        const subject = encodeURIComponent(`${product.title[language]} - Bilgi Talebi`);
        const body = encodeURIComponent(`Merhaba,\n\n${product.title[language]} ürününüz hakkında detaylı bilgi almak istiyorum.\n\nÜrün Linki: ${window.location.href}\n\nTeşekkürler.`);

        if (onEmail) {
            onEmail();
        } else {
            window.open(`mailto:fahri.eren@gmail.com?subject=${subject}&body=${body}`, '_self');
        }
    };

    const handleDownloadImages = () => {
        product.images.forEach((imageUrl, index) => {
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = `${product.title[language]}-${index + 1}.jpg`;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    const ImageModal = () => (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
                <button
                    onClick={() => setShowImageModal(false)}
                    className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-10"
                >
                    <X className="w-6 h-6"/>
                </button>

                <img
                    src={product.images[currentImageIndex]}
                    alt={product.title[language]}
                    className="max-w-full max-h-full object-contain"
                />

                {product.images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6"/>
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors"
                        >
                            <ChevronRight className="w-6 h-6"/>
                        </button>
                    </>
                )}

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {product.images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen pb-12 bg-gray-50">
            <div className="container mx-auto px-6">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 bg-white px-4 py-2 rounded-lg shadow-sm transition-colors"
                >
                    <ChevronLeft className="w-5 h-5"/>
                    {t('products.backToList')}
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* Image Gallery */}
                    <div>
                        <div
                            className="relative bg-white rounded-2xl overflow-hidden shadow-lg mb-4 cursor-pointer group"
                            onClick={() => setShowImageModal(true)}
                        >
                            <img
                                src={product.images[currentImageIndex]}
                                alt={product.title[language]}
                                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80';
                                }}
                            />
                            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg">
                                <Camera className="inline w-4 h-4 mr-1"/>
                                {currentImageIndex + 1}/{product.images.length}
                            </div>

                            {/* Download Images Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDownloadImages();
                                }}
                                className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                                title="Resimleri İndir"
                            >
                                <Download className="w-4 h-4"/>
                            </button>

                            {product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            prevImage();
                                        }}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <ChevronLeft className="w-5 h-5"/>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            nextImage();
                                        }}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <ChevronRight className="w-5 h-5"/>
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-2">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`rounded-lg overflow-hidden border-2 transition-colors ${
                                        index === currentImageIndex ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt={`${product.title[language]} ${index + 1}`}
                                        className="w-full h-20 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&q=80';
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                    {product.title[language]}
                                </h1>
                                <div className="flex items-center text-gray-600 mb-4">
                                    <MapPin className="w-5 h-5 mr-2"/>
                                    {product.location?.[language] || 'Konum bilgisi yok'}
                                </div>
                                <div className="text-4xl font-bold text-blue-600 mb-4">
                                    {product.priceText || `${product.price} ${product.currency}`}
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => onToggleFavorite(product.id)}
                                    className={`p-3 rounded-full transition-colors ${
                                        isFavorite
                                            ? 'bg-red-500 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                                    }`}
                                    title={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                                >
                                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`}/>
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-50 hover:text-blue-500 transition-colors"
                                    title="Paylaş"
                                >
                                    <Share2 className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">{product.views}</div>
                                <div className="text-sm text-gray-600">{t('products.views')}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">
                                    {product.date ? new Date(product.date).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US') : 'Belirtilmemiş'}
                                </div>
                                <div className="text-sm text-gray-600">İlan Tarihi</div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 mb-8">
                            <button
                                onClick={handleCallSeller}
                                className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                            >
                                <Phone className="w-5 h-5"/>
                                <span>Hemen Ara - 05368536265</span>
                            </button>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={handleWhatsAppSeller}
                                    className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
                                >
                                    <MessageCircle className="w-4 h-4"/>
                                    <span>WhatsApp</span>
                                </button>
                                <button
                                    onClick={handleEmailSeller}
                                    className="px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium flex items-center justify-center space-x-2"
                                >
                                    <Mail className="w-4 h-4"/>
                                    <span>Email</span>
                                </button>
                            </div>
                        </div>

                        {/* Seller Info */}
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-4">
                                <div
                                    className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-white"/>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900">{product.seller?.name}</h4>
                                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                                        <div className="flex items-center space-x-1">
                                            <Award className="w-4 h-4"/>
                                            <span>25+ yıl tecrübe</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Star className="w-4 h-4 text-yellow-500"/>
                                            <span>4.9 puan</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            {(['description', 'features', 'seller'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-4 font-medium transition-colors ${
                                        activeTab === tab
                                            ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    {t(`products.${tab}`)}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-8">
                        {activeTab === 'description' && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">{t('products.description')}</h3>
                                <div className="prose max-w-none">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {product.description[language]}
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'features' && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">{t('products.features')}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {product.features?.[language]?.length > 0 ? (
                                        product.features[language].map((feature, index) => (
                                            <div key={index}
                                                 className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-2 text-center text-gray-500 py-8">
                                            {language === 'tr' ? 'Özellik bilgisi bulunmuyor' : 'No features available'}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'seller' && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">{t('products.seller')}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
                                        <div
                                            className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="w-8 h-8 text-white"/>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.seller?.name}</h4>
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <div className="flex items-center space-x-2">
                                                    <Clock className="w-4 h-4"/>
                                                    <span>25+ yıl tecrübe</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Star className="w-4 h-4 text-yellow-500"/>
                                                    <span>4.9/5 müşteri puanı</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Award className="w-4 h-4"/>
                                                    <span>5000+ mutlu müşteri</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <button
                                            onClick={handleCallSeller}
                                            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                                        >
                                            <Phone className="w-4 h-4"/>
                                            <span>Satıcıyı Ara</span>
                                        </button>
                                        <button
                                            onClick={handleWhatsAppSeller}
                                            className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                                        >
                                            <MessageCircle className="w-4 h-4"/>
                                            <span>WhatsApp Mesajı</span>
                                        </button>
                                        <button
                                            onClick={handleEmailSeller}
                                            className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                                        >
                                            <Mail className="w-4 h-4"/>
                                            <span>Email Gönder</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Similar Products */}
                {similarProducts.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold mb-6">{t('products.similarProducts')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {similarProducts.map((similarProduct) => (
                                <div
                                    key={similarProduct.id}
                                    className="cursor-pointer group"
                                    onClick={() => onViewProduct(similarProduct)}
                                >
                                    <div className="bg-gray-100 rounded-xl overflow-hidden mb-3">
                                        <img
                                            src={similarProduct.images[0]}
                                            alt={similarProduct.title[language]}
                                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80';
                                            }}
                                        />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {similarProduct.title[language]}
                                    </h4>
                                    <p className="text-blue-600 font-bold">{similarProduct.priceText}</p>
                                    <p className="text-sm text-gray-500">{similarProduct.location[language]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Image Modal */}
            {showImageModal && <ImageModal/>}
        </div>
    );
};

export default ProductDetail;
