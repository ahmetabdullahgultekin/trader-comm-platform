import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Eye} from 'lucide-react';
import {useProducts, useTranslation} from '../hooks';
import {useFahriErenConfig} from '../hooks/useFahriErenConfig';
import {PhoneType, RouteKey} from '../types/enums';
import SEO from '../components/common/SEO';
import ProductDetail from '../components/products/ProductDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductDetailPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {t, language} = useTranslation();
    const config = useFahriErenConfig();
    const {products, loading, favorites, toggleFavorite} = useProducts();

    // Find the current product
    const product = products.find(p => p.id === id);

    // Find similar products (same category, exclude current product)
    const similarProducts = product
        ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)
        : [];

    const handleBack = () => {
        navigate(RouteKey.PRODUCTS);
    };

    const handleViewProduct = (viewProduct: any) => {
        navigate(`${RouteKey.PRODUCTS}/${viewProduct.id}`);
        window.scrollTo(0, 0);
    };

    const handleCall = () => {
        window.open(config.contact.phoneUri(PhoneType.PRIMARY), '_self');
    };

    const handleWhatsApp = () => {
        const message = product
            ? encodeURIComponent(`Merhaba, ${product.title[language]} hakkında bilgi almak istiyorum.`)
            : '';
        window.open(config.contact.whatsappUrl(message), '_blank');
    };

    const handleEmail = () => {
        const subject = product ? encodeURIComponent(`${product.title[language]} - Bilgi Talebi`) : '';
        const body = product
            ? encodeURIComponent(`Merhaba,\n\n${product.title[language]} ürününüz hakkında detaylı bilgi almak istiyorum.\n\nTeşekkürler.`)
            : '';
        window.open(`mailto:${config.contact.email()}?subject=${subject}&body=${body}`, '_self');
    };

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (!product) {
        return (
            <>
                <SEO
                    title={t('product.notFound')}
                    description={t('product.notFoundDesc')}
                />

                <div className="container mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4"/>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                            {t('product.notFound')}
                        </h2>
                        <p className="text-gray-500 mb-6">
                            {t('product.notFoundDesc')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate(RouteKey.PRODUCTS)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                {t('product.viewAllProducts')}
                            </button>
                            <button
                                onClick={() => window.open(config.contact.whatsappUrl(), '_blank')}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                {t('contact.whatsapp')}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <SEO
                title={product.title[language]}
                description={product.description[language]}
                image={product.images[0]}
                type="product"
            />

            <ProductDetail
                product={product}
                onBack={handleBack}
                onToggleFavorite={toggleFavorite}
                isFavorite={favorites.includes(product.id)}
                similarProducts={similarProducts}
                onViewProduct={handleViewProduct}
                onCall={handleCall}
                onWhatsApp={handleWhatsApp}
                onEmail={handleEmail}
            />
        </>
    );
};

export default ProductDetailPage;
