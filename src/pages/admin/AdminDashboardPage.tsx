import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {BarChart3, Eye, Heart, LogOut, MessageSquare, Package, Plus, TrendingUp, Users} from 'lucide-react';
import {useAuth} from '../../contexts/AuthContext';
import {useProducts} from '../../hooks';
import {RouteKey} from '../../types/enums';
import {motion} from 'framer-motion';

const AdminDashboardPage: React.FC = () => {
    const {user, signOut} = useAuth();
    const {products} = useProducts();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate(RouteKey.HOME);
    };

    const stats = [
        {
            icon: Package,
            label: 'Toplam Ürün',
            value: products.length,
            color: 'from-blue-500 to-blue-600',
            trend: ''
        },
        {
            icon: Eye,
            label: 'Toplam Görüntüleme',
            value: products.reduce((acc, p) => acc + (p.views || 0), 0),
            color: 'from-green-500 to-green-600',
            trend: ''
        },
        {
            icon: Heart,
            label: 'Favorilere Eklenme',
            value: products.reduce((acc, p) => acc + (p.favoriteCount || 0), 0),
            color: 'from-red-500 to-red-600',
            trend: ''
        },
        {
            icon: MessageSquare,
            label: 'İletişim Talebi',
            value: products.reduce((acc, p) => acc + (p.contactCount || 0), 0),
            color: 'from-purple-500 to-purple-600',
            trend: ''
        }
    ];

    const recentProducts = products.slice(0, 5);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                            <p className="text-sm text-gray-600">Hoş geldiniz, {user?.email}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                to={RouteKey.HOME}
                                className="text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Ana Sayfa
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                <LogOut className="w-4 h-4"/>
                                Çıkış
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 py-8">
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Link
                        to={RouteKey.ADMIN_ADD_PRODUCT}
                        className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <Plus className="w-8 h-8"/>
                            <TrendingUp className="w-6 h-6 opacity-50"/>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Yeni Ürün</h3>
                        <p className="text-blue-100 text-sm">Hızlı ürün ekleme</p>
                    </Link>

                    <Link
                        to={RouteKey.ADMIN_PRODUCTS}
                        className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <Package className="w-8 h-8"/>
                            <BarChart3 className="w-6 h-6 opacity-50"/>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Ürünler</h3>
                        <p className="text-green-100 text-sm">Tüm ürünleri yönet</p>
                    </Link>

                    <div
                        className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-6 rounded-xl shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <Users className="w-8 h-8"/>
                            <TrendingUp className="w-6 h-6 opacity-50"/>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Müşteriler</h3>
                        <p className="text-purple-100 text-sm">Yakında...</p>
                    </div>

                    <div
                        className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-6 rounded-xl shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <BarChart3 className="w-8 h-8"/>
                            <TrendingUp className="w-6 h-6 opacity-50"/>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Raporlar</h3>
                        <p className="text-orange-100 text-sm">Yakında...</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: index * 0.1}}
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div
                                        className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                                        <IconComponent className="w-6 h-6 text-white"/>
                                    </div>
                                    <span className="text-green-600 text-sm font-semibold">{stat.trend}</span>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                <p className="text-gray-600 text-sm">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Recent Products */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Son Eklenen Ürünler</h2>
                        <Link
                            to={RouteKey.ADMIN_PRODUCTS}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            Tümünü Gör →
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {recentProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{delay: index * 0.1}}
                                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <img
                                    src={product.images[0]}
                                    alt={product.title.tr}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900">{product.title.tr}</h4>
                                    <p className="text-sm text-gray-600">{product.category}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-blue-600">{product.priceText}</p>
                                    <p className="text-sm text-gray-500">{product.views} görüntüleme</p>
                                </div>
                                <Link
                                    to={`${RouteKey.ADMIN_EDIT_PRODUCT}/${product.id}`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Düzenle
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;