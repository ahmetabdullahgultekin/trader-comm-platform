import React, {useEffect, useState} from 'react';
import {useProducts, useTranslation} from '../../hooks';
import {productService} from '../../services/firebaseService';
import analyticsService, {type AnalyticsData} from '../../services/analyticsService';
import type {Product} from '../../types';
import AddProductPage from './AddProductPage';
import EditProductPage from './EditProductPage';
import {BarChart3, DollarSign, Edit3, Eye, LogOut, Package, Plus, Search, Trash2, TrendingUp} from 'lucide-react';

interface AdminDashboardProps {
    onLogout: () => void;
}

type ViewMode = 'dashboard' | 'add-product' | 'edit-product';

const AdminDashboard: React.FC<AdminDashboardProps> = ({onLogout}) => {
    const {products, loading, refetch} = useProducts();
    const {language, t} = useTranslation();
    const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
        totalViews: 0,
        uniqueVisitors: 0,
        pageViews: {},
        productViews: {},
        categoryViews: {},
        dailyStats: {},
        topProducts: []
    });

    const categories = [
        {value: 'all', label: t('categories.all')},
        {value: 'realestate', label: t('categories.realestate')},
        {value: 'vehicles', label: t('categories.vehicles')},
        {value: 'construction', label: t('categories.construction')},
        {value: 'farm', label: t('categories.farm')}
    ];

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.title.en.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Stats - now using real analytics data
    const stats = {
        totalProducts: products.length,
        totalViews: analyticsData.totalViews,
        uniqueVisitors: analyticsData.uniqueVisitors,
        totalValue: products.reduce((sum, p) => sum + p.price, 0),
        mostViewedCount: Math.max(...products.map(p => p.views || 0)),
        topProduct: products.find(p => p.views === Math.max(...products.map(p => p.views || 0))),
        categories: {
            realestate: products.filter(p => p.category === 'realestate').length,
            vehicles: products.filter(p => p.category === 'vehicles').length,
            construction: products.filter(p => p.category === 'construction').length,
            farm: products.filter(p => p.category === 'farm').length,
        }
    };

    const handleDeleteProduct = async (productId: string) => {
        if (window.confirm(t('admin.deleteConfirm'))) {
            try {
                await productService.deleteProduct(productId);
                refetch();
            } catch (error) {
                console.error('Ürün silinemedi:', error);
                alert(t('admin.deleteError'));
            }
        }
    };

    const handleProductAdded = (product: Product) => {
        refetch();
        setCurrentView('dashboard');
    };

    const handleProductUpdated = (product: Product) => {
        refetch();
        setCurrentView('dashboard');
    };


    // Reset all product views to 0
    const handleResetViews = async () => {
        if (!window.confirm('Tüm ürün görüntülenmeleri sıfırlanacak. Onaylıyor musunuz?')) return;

        try {
            for (const product of products) {
                await productService.updateProduct(product.id, {views: 0});
            }

            // Also reset analytics data
            await analyticsService.resetAnalyticsData();

            alert('✅ Tüm görüntülenmeler ve analytics verileri sıfırlandı!');
            refetch();

            // Reload analytics data
            const newAnalyticsData = await analyticsService.getAnalyticsData();
            setAnalyticsData(newAnalyticsData);
        } catch (error) {
            console.error('Reset views error:', error);
            alert('❌ Görüntülenmeler sıfırlanırken hata oluştu!');
        }
    };

    // Load analytics data
    useEffect(() => {
        const loadAnalytics = async () => {
            const data = await analyticsService.getAnalyticsData();
            setAnalyticsData(data);
        };
        loadAnalytics();
    }, []);

    if (currentView === 'add-product') {
        return (
            <AddProductPage
                onBack={() => setCurrentView('dashboard')}
                onProductAdded={handleProductAdded}
            />
        );
    }

    if (currentView === 'edit-product' && selectedProduct) {
        return (
            <EditProductPage
                product={selectedProduct}
                onBack={() => setCurrentView('dashboard')}
                onProductUpdated={handleProductUpdated}
            />
        );
    }

    return (
        <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{t('admin.title')}</h1>
                            <p className="text-gray-600">{t('admin.subtitle')}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setCurrentView('add-product')}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-5 h-5"/>
                                <span>{t('admin.newProduct')}</span>
                            </button>

                            <button
                                onClick={handleSeedData}
                                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <Package className="w-5 h-5"/>
                                <span>{t('admin.seedData')}</span>
                            </button>

                            <button
                                onClick={handleResetViews}
                                className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                            >
                                <TrendingUp className="w-5 h-5"/>
                                <span>Görüntülenme Sıfırla</span>
                            </button>

                            <button
                                onClick={onLogout}
                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                <LogOut className="w-5 h-5"/>
                                <span>{t('admin.logout')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mr-4">
                                <Package className="w-6 h-6"/>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{t('admin.totalProducts')}</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 text-green-600 rounded-lg mr-4">
                                <Eye className="w-6 h-6"/>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{t('admin.totalViews')}</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">{stats.uniqueVisitors} benzersiz ziyaretçi</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg mr-4">
                                <DollarSign className="w-6 h-6"/>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{t('admin.totalValue')}</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.totalValue.toLocaleString()} TL
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-orange-100 text-orange-600 rounded-lg mr-4">
                                <BarChart3 className="w-6 h-6"/>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{t('admin.mostViewed')}</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.mostViewedCount}
                                </p>
                                {stats.topProduct && (
                                    <p className="text-xs text-gray-500 truncate">
                                        {stats.topProduct.title[language]}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Stats */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.categoryDistribution')}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{stats.categories.realestate}</p>
                            <p className="text-sm text-gray-600">{t('categories.realestate')}</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">{stats.categories.vehicles}</p>
                            <p className="text-sm text-gray-600">{t('categories.vehicles')}</p>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <p className="text-2xl font-bold text-yellow-600">{stats.categories.construction}</p>
                            <p className="text-sm text-gray-600">{t('categories.construction')}</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <p className="text-2xl font-bold text-purple-600">{stats.categories.farm}</p>
                            <p className="text-sm text-gray-600">{t('categories.farm')}</p>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">{t('admin.products')}</h2>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <Search
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Ürün ara..."
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ürün
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Kategori
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fiyat
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Görüntüleme
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tarih
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    İşlemler
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        Yükleniyor...
                                    </td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        {searchTerm || selectedCategory !== 'all'
                                            ? 'Arama kriterlerine uygun ürün bulunamadı'
                                            : 'Henüz ürün eklenmemiş'}
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img
                                                    className="h-12 w-12 rounded-lg object-cover mr-4"
                                                    src={product.images[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&q=80'}
                                                    alt={product.title.tr}
                                                />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                                        {product.title[language]}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {product.location?.[language] || t('common.noLocation')}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                                        product.category === 'realestate' ? 'bg-blue-100 text-blue-800' :
                                                            product.category === 'vehicles' ? 'bg-green-100 text-green-800' :
                                                                product.category === 'construction' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-purple-100 text-purple-800'
                                                    }`}>
                                                    {categories.find(c => c.value === product.category)?.label}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {product.priceText || `${product.price.toLocaleString()} ${product.currency}`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {(product.views || 0).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {product.date ? new Date(product.date).toLocaleDateString('tr-TR') : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center space-x-2 justify-end">
                                                <button
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        setCurrentView('edit-product');
                                                    }}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title={t('admin.edit')}
                                                >
                                                    <Edit3 className="w-4 h-4"/>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title={t('admin.delete')}
                                                >
                                                    <Trash2 className="w-4 h-4"/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;