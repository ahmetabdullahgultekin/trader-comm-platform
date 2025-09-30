import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';
import {ArrowRight, Award, Building2, Car, CheckCircle, HardHat, Phone, Shield, Tractor, Users} from 'lucide-react';
import {useProducts, useTranslation} from '../hooks';
import {useFahriErenConfig} from '../hooks/useFahriErenConfig';
import type {LanguageValue} from '../types/enums';
import {PhoneType, RouteKey} from '../types/enums';
import ProductCard from '../components/products/ProductCard';

// Professional components
import SEO from '../components/common/SEO';
import HeroSection from '../components/common/HeroSection';
import StatsSection from '../components/common/StatsSection';
import TestimonialsSection from '../components/common/TestimonialsSection';
import AdBanner from '../components/ads/AdBanner';

const HomePage: React.FC = () => {
    const {t, language} = useTranslation();
    const config = useFahriErenConfig();
    const currentLanguage = language as LanguageValue;
    const {products, loading: productsLoading, favorites, toggleFavorite} = useProducts();

    const [featuresRef, featuresInView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });

    const [servicesRef, servicesInView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });

    const categories = [
        {
            id: 'realestate',
            title: t('categories.realestate'),
            description: t('categories.realestateDesc'),
            icon: Building2,
            color: 'from-blue-500 to-blue-600',
            href: `${RouteKey.PRODUCTS}?kategori=emlak`
        },
        {
            id: 'vehicles',
            title: t('categories.vehicles'),
            description: t('categories.vehiclesDesc'),
            icon: Car,
            color: 'from-green-500 to-green-600',
            href: `${RouteKey.PRODUCTS}?kategori=arac`
        },
        {
            id: 'agriculture',
            title: t('categories.agriculture'),
            description: t('categories.agricultureDesc'),
            icon: Tractor,
            color: 'from-yellow-500 to-orange-500',
            href: `${RouteKey.PRODUCTS}?kategori=tarim`
        },
        {
            id: 'construction',
            title: t('categories.construction'),
            description: t('categories.constructionDesc'),
            icon: HardHat,
            color: 'from-purple-500 to-purple-600',
            href: `${RouteKey.PRODUCTS}?kategori=insaat`
        }
    ];

    const features = [
        {
            icon: Shield,
            title: t('features.trusted.title'),
            description: t('features.trusted.description')
        },
        {
            icon: Award,
            title: t('features.experience.title'),
            description: t('features.experience.description')
        },
        {
            icon: Users,
            title: t('features.customer.title'),
            description: t('features.customer.description')
        },
        {
            icon: CheckCircle,
            title: t('features.quality.title'),
            description: t('features.quality.description')
        }
    ];

    const services = config.serviceAreas();

    // Handlers
    const handleViewDetails = (product: any) => {
        window.location.href = `${RouteKey.PRODUCTS}/${product.id}`;
    };

    const handleContact = () => {
        window.open(config.config.contact.phoneUri(PhoneType.PRIMARY), '_self');
    };

    const handleShare = (product: any) => {
        if (navigator.share) {
            navigator.share({
                title: product.title[currentLanguage],
                text: product.description[currentLanguage],
                url: window.location.origin + `${RouteKey.PRODUCTS}/${product.id}`
            });
        } else {
            // Fallback to copying URL
            navigator.clipboard.writeText(window.location.origin + `${RouteKey.PRODUCTS}/${product.id}`);
        }
    };

    const handleHeroSearch = (query: string) => {
        window.location.href = `${RouteKey.PRODUCTS}?search=${encodeURIComponent(query)}`;
    };

    const handleNavigateToProducts = () => {
        window.location.href = RouteKey.PRODUCTS;
    };

    return (
        <>
            {/* SEO Optimization */}
            <SEO
                title={t('home.seo.title')}
                description={config.business.description()}
                keywords={config.seo.getData().keywords}
                type="website"
            />

            {/* Hero Section */}
            <HeroSection
                onSearch={handleHeroSearch}
                onNavigateToProducts={handleNavigateToProducts}
            />

            {/* Top Banner Ad - Yüksek görünürlük */}
            <div className="container mx-auto px-4 py-6">
                <AdBanner position="top"/>
            </div>

            {/* Categories Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                        >
                            {t('home.categories.title')}
                        </motion.h2>
                        <motion.p
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: 0.1}}
                            className="text-lg text-gray-600 max-w-2xl mx-auto"
                        >
                            {t('home.categories.subtitle')}
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category, index) => {
                            const IconComponent = category.icon;
                            return (
                                <motion.div
                                    key={category.id}
                                    initial={{opacity: 0, y: 30}}
                                    whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: true}}
                                    transition={{delay: index * 0.1, duration: 0.5}}
                                    whileHover={{y: -5}}
                                    className="group"
                                >
                                    <Link
                                        to={category.href}
                                        className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                                    >
                                        <div
                                            className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent className="w-8 h-8 text-white"/>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {category.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                            {category.description}
                                        </p>
                                        <div
                                            className="flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                                            {t('common.viewMore')}
                                            <ArrowRight className="w-4 h-4 ml-2"/>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                        >
                            {t('home.featuredProducts.title')}
                        </motion.h2>
                        <motion.p
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: 0.1}}
                            className="text-lg text-gray-600 max-w-2xl mx-auto"
                        >
                            {t('home.featuredProducts.subtitle')}
                        </motion.p>
                    </div>

                    {productsLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="bg-gray-100 animate-pulse rounded-lg h-80"></div>
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.slice(0, 6).map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{opacity: 0, y: 30}}
                                    whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: true}}
                                    transition={{delay: index * 0.1, duration: 0.5}}
                                >
                                    <ProductCard
                                        product={product}
                                        onViewDetails={handleViewDetails}
                                        isFavorite={favorites.includes(product.id)}
                                        onToggleFavorite={toggleFavorite}
                                        onShare={handleShare}
                                        onContact={handleContact}
                                        viewMode="grid"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="bg-gray-50 rounded-lg p-8">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    {t('products.comingSoon')}
                                </h3>
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
                        </div>
                    )}

                    {/* Inline Ad - Ürünler arasında */}
                    {products.length > 0 && (
                        <div className="my-12">
                            <AdBanner position="inline"/>
                        </div>
                    )}

                    {products.length > 6 && (
                        <div className="text-center mt-12">
                            <Link
                                to={RouteKey.PRODUCTS}
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg"
                            >
                                {t('home.viewAllProducts')}
                                <ArrowRight className="w-5 h-5"/>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <StatsSection/>

            {/* Features Section */}
            <section ref={featuresRef} className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{opacity: 0, y: 20}}
                            animate={featuresInView ? {opacity: 1, y: 0} : {}}
                            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                        >
                            {t('home.features.title')}
                        </motion.h2>
                        <motion.p
                            initial={{opacity: 0, y: 20}}
                            animate={featuresInView ? {opacity: 1, y: 0} : {}}
                            transition={{delay: 0.1}}
                            className="text-lg text-gray-600 max-w-2xl mx-auto"
                        >
                            {config.business.description()}
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, y: 30}}
                                    animate={featuresInView ? {opacity: 1, y: 0} : {}}
                                    transition={{delay: index * 0.1 + 0.2, duration: 0.5}}
                                    className="text-center"
                                >
                                    <div
                                        className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                                        <IconComponent className="w-8 h-8 text-blue-600"/>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section ref={servicesRef} className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{opacity: 0, y: 20}}
                            animate={servicesInView ? {opacity: 1, y: 0} : {}}
                            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                        >
                            {t('home.services.title')}
                        </motion.h2>
                        <motion.p
                            initial={{opacity: 0, y: 20}}
                            animate={servicesInView ? {opacity: 1, y: 0} : {}}
                            transition={{delay: 0.1}}
                            className="text-lg text-gray-600 max-w-2xl mx-auto"
                        >
                            {t('home.services.subtitle')}
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, x: -30}}
                                animate={servicesInView ? {opacity: 1, x: 0} : {}}
                                transition={{delay: index * 0.1 + 0.3, duration: 0.5}}
                                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex items-center mb-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3"/>
                                    <h3 className="font-semibold text-gray-900">{service}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <TestimonialsSection/>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            {t('home.cta.title')}
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                            {t('home.cta.description')}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => window.open(config.contact.phoneUri(PhoneType.PRIMARY), '_self')}
                                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-3 shadow-lg"
                            >
                                <Phone className="w-5 h-5"/>
                                {config.contact.phone(PhoneType.DISPLAY)}
                            </button>
                            <button
                                onClick={() => window.open(config.contact.whatsappUrl(), '_blank')}
                                className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-3 shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z"/>
                                </svg>
                                WhatsApp
                            </button>
                        </div>
                        <p className="text-blue-100 text-sm mt-6">
                            {config.contact.workingHours()} • {t('home.cta.responseTime')}
                        </p>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
