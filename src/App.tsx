import React, {useState} from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/common/HeroSection';
import ProductCard from './components/products/ProductCard';
import ProductDetail from './components/products/ProductDetail';
import ProductFilters from './components/products/ProductFilters';
import AboutPage from './components/about/AboutPage';
import ContactPage from './components/contact/ContactPage';
import PartnersPage from './components/partners/PartnersPage';
import {useNewsletter, useProducts, useSEO, useTranslation} from './hooks';
import {AdminPanel} from './components/admin/AdminPanel';
import analyticsService from './services/analyticsService';
import type {Product} from './types';
import {Filter, Grid, List, Loader, Mail, RefreshCw, Send, Settings} from 'lucide-react';

// Newsletter Component
const NewsletterSection: React.FC = () => {
    const {email, setEmail, subscribe, isSubmitting, status} = useNewsletter();
    const {t} = useTranslation();

    return (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto text-center text-white">
                    <Mail className="w-12 h-12 mx-auto mb-6"/>
                    <h3 className="text-2xl font-bold mb-4">
                        {t('newsletter.title')}
                    </h3>
                    <p className="text-blue-100 mb-8">
                        {t('newsletter.description')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('newsletter.placeholder')}
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                            disabled={isSubmitting}
                        />
                        <button
                            onClick={subscribe}
                            disabled={isSubmitting || !email}
                            className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {isSubmitting ? (
                                <Loader className="w-4 h-4 animate-spin"/>
                            ) : (
                                <Send className="w-4 h-4"/>
                            )}
                            <span>{isSubmitting ? t('newsletter.subscribing') : t('newsletter.subscribe')}</span>
                        </button>
                    </div>

                    {status === 'success' && (
                        <p className="mt-4 text-green-200">✅ {t('newsletter.success')}</p>
                    )}
                    {status === 'error' && (
                        <p className="mt-4 text-red-200">❌ {t('newsletter.error')}</p>
                    )}
                </div>
            </div>
        </section>
    );
};

// Loading Component
const LoadingSpinner: React.FC = () => {
    const {t} = useTranslation();
    return (
        <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
                <Loader className="w-6 h-6 animate-spin text-blue-600"/>
                <span className="text-gray-600">{t('common.loading')}</span>
            </div>
        </div>
    );
};

// Main App Component - Controller Pattern
const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<string>('home');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showAdminPanel, setShowAdminPanel] = useState(false);

    const {
        products,
        allProducts,
        loading,
        error,
        filters,
        updateFilters,
        clearFilters,
        favorites,
        toggleFavorite,
        refetch
    } = useProducts();
    const {language, t} = useTranslation();

    // SEO hook for current page
    useSEO(currentPage);

    // Navigation handlers with active functionality
    const handlePageChange = (page: string) => {
        setCurrentPage(page);
        setSelectedProduct(null);
        window.scrollTo({top: 0, behavior: 'smooth'});
        // Track page view for analytics
        analyticsService.trackPageView(page);
    };

    const handleProductSelect = (product: Product) => {
        setSelectedProduct(product);
        setCurrentPage('product-detail');

        // Increment view count (simulate API call)
        product.views += 1;
    };

    const handleSearch = (query: string) => {
        updateFilters({searchQuery: query});
        setCurrentPage('products');
    };

    const handleCallPhone = () => {
        window.open('tel:+905321234567', '_self');
    };

    const handleSendEmail = () => {
        window.open('mailto:fahri.eren@gmail.com?subject=İletişim%20-%20Fahri%20Eren', '_self');
    };

    const handleOpenWhatsApp = () => {
        const message = encodeURIComponent('Merhaba, ürünleriniz hakkında bilgi almak istiyorum.');
        window.open(`https://wa.me/905321234567?text=${message}`, '_blank');
    };

    const handleShare = (product?: Product) => {
        const shareData = product ? {
            title: product.title[language],
            text: product.description[language],
            url: `${window.location.origin}?product=${product.id}`
        } : {
            title: 'Fahri Eren - Kaliteli Ürünler',
            text: 'En kaliteli ürünleri keşfedin',
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData);
        } else {
            navigator.clipboard.writeText(shareData.url);
            alert('Link kopyalandı!');
        }
    };

    // Get similar products for product detail page
    const getSimilarProducts = (product: Product): Product[] => {
        return allProducts
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 3);
    };

    // Home Page Component
    const HomePage = () => (
        <div>
            <HeroSection
                onSearch={handleSearch}
                onNavigateToProducts={() => handlePageChange('products')}
            />

            {/* Featured Products Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <h2 className="text-3xl font-bold text-gray-900">{t('products.title')}</h2>
                            <button
                                onClick={refetch}
                                className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                                title={t('admin.refresh')}
                            >
                                <RefreshCw className="w-5 h-5 text-blue-600"/>
                            </button>
                        </div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {language === 'tr'
                                ? 'En kaliteli ürünlerimizi keşfedin'
                                : 'Discover our highest quality products'
                            }
                        </p>
                    </div>

                    {loading ? (
                        <LoadingSpinner/>
                    ) : error ? (
                        <div className="text-center py-12">
                            <p className="text-red-600 mb-4">{error}</p>
                            <button
                                onClick={refetch}
                                className="flex items-center space-x-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4"/>
                                <span>{t('common.tryAgain')}</span>
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {allProducts.filter(p => p.featured).slice(0, 6).map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onViewDetails={handleProductSelect}
                                    isFavorite={favorites.includes(product.id)}
                                    onToggleFavorite={toggleFavorite}
                                    onShare={() => handleShare(product)}
                                    onContact={handleCallPhone}
                                />
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <button
                            onClick={() => handlePageChange('products')}
                            className="btn-primary"
                        >
                            {t('common.viewAll')}
                        </button>
                    </div>
                </div>
            </section>

            <NewsletterSection/>
        </div>
    );

    // Products Page Component
    const ProductsPage = () => (
        <div className="pt-20">
            <div className="bg-gray-50 py-12">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Ürünlerimiz</h1>
                        <button
                            onClick={refetch}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <RefreshCw className="w-4 h-4"/>
                            <span>{t('admin.refresh')}</span>
                        </button>
                    </div>

                    {/* Filters and View Controls */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border hover:bg-gray-50 transition-colors"
                            >
                                <Filter className="w-4 h-4"/>
                                <span>Filtrele</span>
                            </button>

                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Görünüm:</span>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                                >
                                    <Grid className="w-4 h-4"/>
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                                >
                                    <List className="w-4 h-4"/>
                                </button>
                            </div>
                        </div>

                        <div className="text-sm text-gray-600">
                            {products.length} ürün bulundu
                        </div>
                    </div>

                    {/* Filters */}
                    {showFilters && (
                        <div className="mb-8">
                            <ProductFilters
                                filters={filters}
                                onUpdateFilters={updateFilters}
                                onClearFilters={clearFilters}
                                showFilters={showFilters}
                                onToggleFilters={() => setShowFilters(!showFilters)}
                            />
                        </div>
                    )}

                    {/* Products Grid/List */}
                    {loading ? (
                        <LoadingSpinner/>
                    ) : (
                        <div className={viewMode === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                            : 'space-y-6'
                        }>
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onViewDetails={handleProductSelect}
                                    isFavorite={favorites.includes(product.id)}
                                    onToggleFavorite={toggleFavorite}
                                    onShare={() => handleShare(product)}
                                    onContact={handleCallPhone}
                                    viewMode={viewMode}
                                />
                            ))}
                        </div>
                    )}

                    {products.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <p className="text-gray-600 mb-4">Arama kriterlerinize uygun ürün bulunamadı.</p>
                            <button
                                onClick={clearFilters}
                                className="btn-secondary"
                            >
                                Filtreleri Temizle
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    // Product Detail Page Component
    const ProductDetailPage = () => {
        if (!selectedProduct) return <div>Ürün bulunamadı</div>;

        const similarProducts = getSimilarProducts(selectedProduct);

        return (
            <div className="pt-20">
                <ProductDetail
                    product={selectedProduct}
                    onBack={() => handlePageChange('products')}
                    onCall={handleCallPhone}
                    onWhatsApp={handleOpenWhatsApp}
                    onEmail={handleSendEmail}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={favorites.includes(selectedProduct.id)}
                    similarProducts={similarProducts}
                    onViewProduct={handleProductSelect}
                    onRefresh={refetch}
                />
            </div>
        );
    };

    // Render current page
    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage/>;
            case 'products':
                return <ProductsPage/>;
            case 'product-detail':
                return <ProductDetailPage/>;
            case 'about':
                return <AboutPage onNavigateToContact={() => handlePageChange('contact')} onContact={handleCallPhone}/>;
            case 'contact':
                return <ContactPage/>;
            case 'partners':
                return <PartnersPage onContact={handleCallPhone}/>;
            default:
                return <HomePage/>;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            <main className="flex-1 pt-20">
                {renderCurrentPage()}
            </main>

            <Footer
                onPageChange={handlePageChange}
                onContact={handleCallPhone}
                onEmail={handleSendEmail}
                onWhatsApp={handleOpenWhatsApp}
            />

            {/* Admin Panel Toggle Button */}
            <button
                onClick={() => setShowAdminPanel(true)}
                className="fixed bottom-4 right-4 p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 z-30"
                title="Admin Panel"
            >
                <Settings className="w-5 h-5"/>
            </button>

            {/* Admin Panel */}
            <AdminPanel
                isOpen={showAdminPanel}
                onClose={() => setShowAdminPanel(false)}
            />
        </div>
    );
};

export default App;
