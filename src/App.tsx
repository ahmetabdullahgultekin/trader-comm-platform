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
import type {Product} from './types';
import {Grid, List, Loader, Mail, RefreshCw, Send} from 'lucide-react';

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
                        {t('newsletter.title') || 'Newsletter'}
                    </h3>
                    <p className="text-blue-100 mb-8">
                        {t('newsletter.description') || 'Yeni ürünler ve fırsatlardan haberdar olmak için abone olun'}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email adresiniz"
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
                            <span>{isSubmitting ? 'Gönderiliyor...' : 'Abone Ol'}</span>
                        </button>
                    </div>

                    {status === 'success' && (
                        <p className="mt-4 text-green-200">✅ Başarıyla abone oldunuz!</p>
                    )}
                    {status === 'error' && (
                        <p className="mt-4 text-red-200">❌ Bir hata oluştu. Lütfen tekrar deneyin.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

// Loading Component
const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3">
            <Loader className="w-6 h-6 animate-spin text-blue-600"/>
            <span className="text-gray-600">Yükleniyor...</span>
        </div>
    </div>
);

// Main App Component - Controller Pattern
const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<string>('home');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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

    const handleShareProduct = (product: Product) => {
        if (navigator.share) {
            navigator.share({
                title: product.title[language],
                text: product.description[language],
                url: window.location.href
            });
        } else {
            // Fallback - copy to clipboard
            const url = `${window.location.origin}?product=${product.id}`;
            navigator.clipboard.writeText(url);
            alert('Link kopyalandı!');
        }
    };

    // Get similar products for product detail page
    const getSimilarProducts = (product: Product): Product[] => {
        return allProducts
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 3);
    };

    // Home Page Component with Newsletter
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('products.title')}</h2>
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
                                <span>Tekrar Dene</span>
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
                                    onShare={() => handleShareProduct(product)}
                                    onContact={handleCallPhone}
                                />
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <button
                            onClick={() => handlePageChange('products')}
                            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                        >
                            {t('products.showMore')}
                        </button>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <NewsletterSection/>

            {/* Quick Actions Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div
                            className="text-center p-8 bg-green-50 rounded-2xl cursor-pointer hover:bg-green-100 transition-colors"
                            onClick={handleCallPhone}
                        >
                            <div
                                className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                📞
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Hemen Ara</h3>
                            <p className="text-gray-600">+90 532 123 45 67</p>
                        </div>

                        <div
                            className="text-center p-8 bg-blue-50 rounded-2xl cursor-pointer hover:bg-blue-100 transition-colors"
                            onClick={handleSendEmail}
                        >
                            <div
                                className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                ✉️
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Gönder</h3>
                            <p className="text-gray-600">fahri.eren@gmail.com</p>
                        </div>

                        <div
                            className="text-center p-8 bg-green-50 rounded-2xl cursor-pointer hover:bg-green-100 transition-colors"
                            onClick={handleOpenWhatsApp}
                        >
                            <div
                                className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                💬
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp</h3>
                            <p className="text-gray-600">Anında mesaj gönderin</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

    // Products Page Component with enhanced functionality
    const ProductsPage = () => (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('products.title')}</h1>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <p className="text-gray-600">
                            {loading ? 'Yükleniyor...' : `${products.length} ${language === 'tr' ? 'ürün bulundu' : 'products found'}`}
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <Grid className="w-5 h-5"/>
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <List className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <ProductFilters
                            filters={filters}
                            onUpdateFilters={updateFilters}
                            onClearFilters={clearFilters}
                            showFilters={showFilters}
                            onToggleFilters={() => setShowFilters(!showFilters)}
                        />
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
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
                                    <span>Tekrar Dene</span>
                                </button>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">
                                    {language === 'tr' ? 'Aradığınız kriterlere uygun ürün bulunamadı.' : 'No products found matching your criteria.'}
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {t('filters.clear')}
                                </button>
                            </div>
                        ) : (
                            <div className={viewMode === 'grid'
                                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                                : 'space-y-6'
                            }>
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onViewDetails={handleProductSelect}
                                        isFavorite={favorites.includes(product.id)}
                                        onToggleFavorite={toggleFavorite}
                                        onShare={() => handleShareProduct(product)}
                                        onContact={handleCallPhone}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    // Render current page
    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage/>;
            case 'products':
                return <ProductsPage/>;
            case 'product-detail':
                return selectedProduct ? (
                    <ProductDetail
                        product={selectedProduct}
                        onBack={() => handlePageChange('products')}
                        onToggleFavorite={toggleFavorite}
                        isFavorite={favorites.includes(selectedProduct.id)}
                        similarProducts={getSimilarProducts(selectedProduct)}
                        onViewProduct={handleProductSelect}
                        onCall={handleCallPhone}
                        onWhatsApp={handleOpenWhatsApp}
                        onEmail={handleSendEmail}
                    />
                ) : <HomePage/>;
            case 'about':
                return <AboutPage onNavigateToContact={() => handlePageChange('contact')}/>;
            case 'contact':
                return <ContactPage/>;
            case 'partners':
                return <PartnersPage/>;
            default:
                return <HomePage/>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            <main>
                {renderCurrentPage()}
            </main>

            <Footer/>
        </div>
    );
};

export default App;
