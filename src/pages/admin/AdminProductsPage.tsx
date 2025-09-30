import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Edit, Eye, LogOut, Plus, Search, Trash2} from 'lucide-react';
import {useAuth} from '../../hooks/useAuth';
import {useProducts, useTranslation} from '../../hooks';
import {RouteKey} from '../../types/enums';
import {motion} from 'framer-motion';

const AdminProductsPage: React.FC = () => {
    const {user, signOut} = useAuth();
    const {products} = useProducts();
    const {language} = useTranslation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(product =>
        product.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLogout = async () => {
        await signOut();
        navigate(RouteKey.HOME);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Ürün Yönetimi</h1>
                            <p className="text-sm text-gray-600">Tüm ürünleri görüntüle ve yönet</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                to={RouteKey.ADMIN_DASHBOARD}
                                className="text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Dashboard
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
                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Ürün ara..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <Link
                        to={RouteKey.ADMIN_ADD_PRODUCT}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-5 h-5"/>
                        Yeni Ürün Ekle
                    </Link>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Ürün
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Kategori
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Fiyat
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Görüntüleme
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Durum
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    İşlemler
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredProducts.map((product, index) => (
                                <motion.tr
                                    key={product.id}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: index * 0.05}}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={product.images[0]}
                                                alt={product.title[language]}
                                                className="w-12 h-12 object-cover rounded-lg"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {product.title[language]}
                                                </p>
                                                <p className="text-sm text-gray-500">{product.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-gray-900">{product.priceText}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Eye className="w-4 h-4 text-gray-400"/>
                                            <span className="text-gray-600">{product.views}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                                            Aktif
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                to={`${RouteKey.PRODUCTS}/${product.id}`}
                                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Görüntüle"
                                            >
                                                <Eye className="w-4 h-4"/>
                                            </Link>
                                            <Link
                                                to={`${RouteKey.ADMIN_EDIT_PRODUCT}/${product.id}`}
                                                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                title="Düzenle"
                                            >
                                                <Edit className="w-4 h-4"/>
                                            </Link>
                                            <button
                                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Sil"
                                            >
                                                <Trash2 className="w-4 h-4"/>
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 mb-4">Ürün bulunamadı</p>
                            <Link
                                to={RouteKey.ADMIN_ADD_PRODUCT}
                                className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-5 h-5"/>
                                İlk Ürünü Ekle
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination (Optional) */}
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Toplam {filteredProducts.length} ürün gösteriliyor
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminProductsPage;