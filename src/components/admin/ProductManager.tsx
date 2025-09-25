import React, {useEffect, useState} from 'react';
import {Edit, Plus, Save, Trash2, Upload, X} from 'lucide-react';
import {productService, storageService} from '../../services/firebaseService';
import type {Product} from '../../types';

export const ProductManager: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: {tr: '', en: ''},
        description: {tr: '', en: ''},
        price: 0,
        currency: 'TRY' as const,
        category: 'electronics' as const,
        featured: false,
        inStock: true,
        specifications: {}
    });

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);

    // Load products
    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getProducts();
            setProducts(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const resetForm = () => {
        setFormData({
            title: {tr: '', en: ''},
            description: {tr: '', en: ''},
            price: 0,
            currency: 'TRY',
            category: 'electronics',
            featured: false,
            inStock: true,
            specifications: {}
        });
        setImageFiles([]);
        setEditingProduct(null);
    };

    const handleAddProduct = () => {
        resetForm();
        setShowAddModal(true);
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            title: product.title,
            description: product.description,
            price: product.price,
            currency: product.currency,
            category: product.category,
            featured: product.featured || false,
            inStock: product.inStock,
            specifications: product.specifications || {}
        });
        setShowAddModal(true);
    };

    const handleDeleteProduct = async (productId: string) => {
        if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;

        try {
            await productService.deleteProduct(productId);
            await loadProducts();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.tr || !formData.title.en || !formData.description.tr || !formData.description.en) {
            setError('Tüm başlık ve açıklama alanlarını doldurmanız gerekir.');
            return;
        }

        try {
            setUploading(true);
            setError(null);

            let imageUrls: string[] = editingProduct?.images || [];

            if (imageFiles.length > 0) {
                const tempProductId = editingProduct?.id || `temp_${Date.now()}`;
                imageUrls = await storageService.uploadMultipleImages(imageFiles, tempProductId);
            }

            const productData = {
                ...formData,
                images: imageUrls,
                rating: editingProduct?.rating || 0,
                reviews: editingProduct?.reviews || 0,
                views: editingProduct?.views || 0
            };

            if (editingProduct) {
                await productService.updateProduct(editingProduct.id, productData);
            } else {
                await productService.addProduct(productData);
            }

            await loadProducts();
            setShowAddModal(false);
            resetForm();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
            </div>
        );
    }

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Ürün Yönetimi</h3>
                <button
                    onClick={handleAddProduct}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                    <Plus className="w-4 h-4 mr-2"/>
                    Ürün Ekle
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-md">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            {/* Products List */}
            <div className="space-y-4">
                {products.map((product) => (
                    <div key={product.id} className="bg-white border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{product.title.tr}</h4>
                                <p className="text-sm text-gray-600 mt-1">{product.category}</p>
                                <p className="text-sm font-medium text-green-600 mt-2">
                                    {product.price} {product.currency}
                                </p>
                                <div className="flex items-center mt-2 space-x-2">
                                    {product.featured && (
                                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                                            Öne Çıkan
                                        </span>
                                    )}
                                    <span className={`px-2 py-1 text-xs rounded ${
                                        product.inStock
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {product.inStock ? 'Stokta' : 'Stokta Yok'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleEditProduct(product)}
                                    className="p-2 text-gray-600 hover:text-blue-600"
                                >
                                    <Edit className="w-4 h-4"/>
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="p-2 text-gray-600 hover:text-red-600"
                                >
                                    <Trash2 className="w-4 h-4"/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {products.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        Henüz ürün eklenmemiş.
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium">
                                {editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
                            </h3>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5"/>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Title Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Başlık (Türkçe)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title.tr}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            title: {...prev.title, tr: e.target.value}
                                        }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Başlık (İngilizce)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title.en}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            title: {...prev.title, en: e.target.value}
                                        }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Açıklama (Türkçe)
                                    </label>
                                    <textarea
                                        value={formData.description.tr}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            description: {...prev.description, tr: e.target.value}
                                        }))}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Açıklama (İngilizce)
                                    </label>
                                    <textarea
                                        value={formData.description.en}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            description: {...prev.description, en: e.target.value}
                                        }))}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Price and Category */}
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fiyat
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            price: parseFloat(e.target.value) || 0
                                        }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Para Birimi
                                    </label>
                                    <select
                                        value={formData.currency}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            currency: e.target.value as 'TRY' | 'USD' | 'EUR'
                                        }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="TRY">TRY</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Kategori
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            category: e.target.value as any
                                        }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="electronics">Elektronik</option>
                                        <option value="vehicles">Araçlar</option>
                                        <option value="realestate">Emlak</option>
                                        <option value="fashion">Moda</option>
                                        <option value="home">Ev & Yaşam</option>
                                    </select>
                                </div>
                            </div>

                            {/* Images */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ürün Görselleri
                                </label>
                                <div className="flex items-center">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        <Upload className="w-4 h-4 mr-2"/>
                                        Görsel Seç
                                    </label>
                                    {imageFiles.length > 0 && (
                                        <span className="ml-3 text-sm text-gray-600">
                                            {imageFiles.length} dosya seçildi
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Checkboxes */}
                            <div className="flex space-x-6">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            featured: e.target.checked
                                        }))}
                                        className="mr-2"
                                    />
                                    Öne Çıkan Ürün
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.inStock}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            inStock: e.target.checked
                                        }))}
                                        className="mr-2"
                                    />
                                    Stokta Var
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4 mr-2"/>
                                    {uploading ? 'Kaydediliyor...' : 'Kaydet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};