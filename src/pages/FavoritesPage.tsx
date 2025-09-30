import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Heart, Package, Trash2} from 'lucide-react';
import {useProducts, useTranslation} from '../hooks';
import {useFahriErenConfig} from '../hooks/useFahriErenConfig';
import {PhoneType, RouteKey} from '../types/enums';
import {motion} from 'framer-motion';
import SEO from '../components/common/SEO';
import ProductCard from '../components/products/ProductCard';

const FavoritesPage: React.FC = () => {
    const {t, language} = useTranslation();
    const config = useFahriErenConfig();
    const navigate = useNavigate();
    const {products, favorites, toggleFavorite} = useProducts();

    const favoriteProducts = products.filter(p => favorites.includes(p.id));

    const handleViewDetails = (product: any) => {
        navigate(`${RouteKey.PRODUCTS}/${product.id}`);
    };

    const handleContact = () => {
        window.open(config.config.contact.phoneUri(PhoneType.PRIMARY), '_self');
    };

    const handleShare = (product: any) => {
        if (navigator.share) {
            navigator.share({
                title: product.title[language],
                text: product.description[language],
                url: window.location.origin + `${RouteKey.PRODUCTS}/${product.id}`
            });
        } else {
            navigator.clipboard.writeText(window.location.origin + `${RouteKey.PRODUCTS}/${product.id}`);
        }
    };

    const handleClearAll = () => {
        if (window.confirm('Tüm favorileri temizlemek istediğinize emin misiniz?')) {
            favoriteProducts.forEach(product => toggleFavorite(product.id));
        }
    };

    return (
        <>
            <SEO
                title={language === 'tr' ? 'Favorilerim' : 'My Favorites'}
                description={language === 'tr' ? 'Beğendiğim ve takip ettiğim ürünler' : 'Products I like and follow'}
            />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                                <Heart className="w-8 h-8 text-red-500 fill-current"/>
                                {language === 'tr' ? 'Favorilerim' : 'My Favorites'}
                            </h1>
                            <p className="text-gray-600">
                                {favoriteProducts.length > 0
                                    ? `${favoriteProducts.length} ${language === 'tr' ? 'favori ürün' : 'favorite products'}`
                                    : language === 'tr' ? 'Henüz favori ürününüz yok' : 'No favorite products yet'
                                }
                            </p>
                        </div>

                        {favoriteProducts.length > 0 && (
                            <button
                                onClick={handleClearAll}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                <Trash2 className="w-4 h-4"/>
                                {language === 'tr' ? 'Tümünü Temizle' : 'Clear All'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Empty State */}
                {favoriteProducts.length === 0 ? (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-white rounded-lg shadow-sm p-12 text-center"
                    >
                        <Package className="w-20 h-20 text-gray-300 mx-auto mb-6"/>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                            {language === 'tr' ? 'Favori Listeniz Boş' : 'Your Favorites List is Empty'}
                        </h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            {language === 'tr'
                                ? 'Beğendiğiniz ürünleri favorilere ekleyerek daha sonra kolayca erişebilirsiniz'
                                : 'Add products you like to favorites to easily access them later'
                            }
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate(RouteKey.PRODUCTS)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                            >
                                {language === 'tr' ? 'Ürünlere Göz At' : 'Browse Products'}
                            </button>
                            <button
                                onClick={() => window.open(config.contact.whatsappUrl(), '_blank')}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                            >
                                WhatsApp
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <>
                        {/* Info Banner */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <Heart className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"/>
                                <div>
                                    <h3 className="font-semibold text-blue-900 mb-1">
                                        {language === 'tr' ? 'Favoriler Hakkında' : 'About Favorites'}
                                    </h3>
                                    <p className="text-sm text-blue-800">
                                        {language === 'tr'
                                            ? 'Favorileriniz tarayıcınızda saklanır. Herhangi bir zamanda ürünleri favorilere ekleyebilir veya çıkarabilirsiniz.'
                                            : 'Your favorites are stored in your browser. You can add or remove products from favorites at any time.'
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {favoriteProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{opacity: 0, y: 30}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: index * 0.1}}
                                >
                                    <ProductCard
                                        product={product}
                                        onViewDetails={handleViewDetails}
                                        isFavorite={true}
                                        onToggleFavorite={toggleFavorite}
                                        onShare={handleShare}
                                        onContact={handleContact}
                                        viewMode="grid"
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Section */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.5}}
                            className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white"
                        >
                            <h3 className="text-2xl font-bold mb-4">
                                {language === 'tr' ? 'Detaylı Bilgi İçin İletişime Geçin' : 'Contact for Detailed Information'}
                            </h3>
                            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                                {language === 'tr'
                                    ? 'Favori ürünleriniz hakkında daha fazla bilgi almak için bizimle iletişime geçebilirsiniz'
                                    : 'Contact us for more information about your favorite products'
                                }
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => window.open(config.contact.phoneUri(PhoneType.PRIMARY), '_self')}
                                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                >
                                    {config.contact.phone(PhoneType.DISPLAY)}
                                </button>
                                <button
                                    onClick={() => window.open(config.contact.whatsappUrl(), '_blank')}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    WhatsApp ile İletişim
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </div>
        </>
    );
};

export default FavoritesPage;