import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from '../../hooks';
import {productService, storageService} from '../../services/firebaseService';
import type {Product, ProductCategory} from '../../types';
import {AlertCircle, ArrowLeft, CheckCircle, Image as ImageIcon, Loader, Save, X} from 'lucide-react';

interface EditProductPageProps {
    product: Product;
    onBack: () => void;
    onProductUpdated: (product: Product) => void;
}

const EditProductPage: React.FC<EditProductPageProps> = ({product, onBack, onProductUpdated}) => {
    const {language, t} = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        currency: product.currency,
        category: product.category,
        location: product.location || {tr: '', en: ''},
        priceText: product.priceText || '',
        features: product.features || {tr: [''], en: ['']},
        specifications: Object.entries(product.specifications || {}).map(([key, value]) => ({key, value}))
    });

    const [existingImages, setExistingImages] = useState<string[]>(product.images || []);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const categories = [
        {value: 'realestate', label: {tr: 'Emlak', en: 'Real Estate'}},
        {value: 'vehicles', label: {tr: 'Araçlar', en: 'Vehicles'}},
        {value: 'construction', label: {tr: 'İnşaat Malzemeleri', en: 'Construction Materials'}},
        {value: 'farm', label: {tr: 'Çiftlik Ürünleri', en: 'Farm Products'}}
    ];

    useEffect(() => {
        // Reset status after some time
        if (status !== 'idle') {
            const timer = setTimeout(() => setStatus('idle'), 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleInputChange = (field: string, value: any, lang?: string) => {
        if (lang) {
            setFormData(prev => ({
                ...prev,
                [field]: {...prev[field as keyof typeof prev], [lang]: value}
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleFeatureChange = (index: number, value: string, lang: 'tr' | 'en') => {
        setFormData(prev => ({
            ...prev,
            features: {
                ...prev.features,
                [lang]: prev.features[lang].map((item, i) => i === index ? value : item)
            }
        }));
    };

    const addFeature = (lang: 'tr' | 'en') => {
        setFormData(prev => ({
            ...prev,
            features: {
                ...prev.features,
                [lang]: [...prev.features[lang], '']
            }
        }));
    };

    const removeFeature = (index: number, lang: 'tr' | 'en') => {
        if (formData.features[lang].length > 1) {
            setFormData(prev => ({
                ...prev,
                features: {
                    ...prev.features,
                    [lang]: prev.features[lang].filter((_, i) => i !== index)
                }
            }));
        }
    };

    const handleSpecificationChange = (index: number, field: 'key' | 'value', value: string) => {
        setFormData(prev => ({
            ...prev,
            specifications: prev.specifications.map((spec, i) =>
                i === index ? {...spec, [field]: value} : spec
            )
        }));
    };

    const addSpecification = () => {
        setFormData(prev => ({
            ...prev,
            specifications: [...prev.specifications, {key: '', value: ''}]
        }));
    };

    const removeSpecification = (index: number) => {
        if (formData.specifications.length > 1) {
            setFormData(prev => ({
                ...prev,
                specifications: prev.specifications.filter((_, i) => i !== index)
            }));
        }
    };

    const handleNewImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (files.length > 0) {
            setNewImages(prev => [...prev, ...files]);

            // Create preview URLs
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    setNewImagePreviews(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeExistingImage = (index: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeNewImage = (index: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
        setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const validateForm = (): boolean => {
        if (!formData.title.tr || !formData.title.en) {
            setMessage('Ürün başlığı Türkçe ve İngilizce olarak gerekli');
            setStatus('error');
            return false;
        }

        if (!formData.description.tr || !formData.description.en) {
            setMessage('Ürün açıklaması Türkçe ve İngilizce olarak gerekli');
            setStatus('error');
            return false;
        }

        if (!formData.price || parseFloat(formData.price) <= 0) {
            setMessage('Geçerli bir fiyat giriniz');
            setStatus('error');
            return false;
        }

        if (existingImages.length === 0 && newImages.length === 0) {
            setMessage('En az bir ürün görseli olmalı');
            setStatus('error');
            return false;
        }

        return true;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setStatus('idle');
        setMessage('');

        try {
            // Upload new images if any
            let newImageUrls: string[] = [];
            if (newImages.length > 0) {
                newImageUrls = await storageService.uploadMultipleImages(newImages, product.id);
            }

            // Combine existing and new images
            const allImages = [...existingImages, ...newImageUrls];

            // Prepare updated product data
            const updatedProductData: Partial<Product> = {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                currency: formData.currency,
                category: formData.category,
                images: allImages,
                priceText: formData.priceText || `${formData.price} ${formData.currency}`,
                location: formData.location,
                features: formData.features,
                specifications: formData.specifications
                    .filter(spec => spec.key && spec.value)
                    .reduce((acc, spec) => ({...acc, [spec.key]: spec.value}), {})
            };

            // Update product in Firebase
            await productService.updateProduct(product.id, updatedProductData);

            // Get the updated product data
            const updatedProduct = await productService.getProduct(product.id);

            setStatus('success');
            setMessage('✅ Ürün başarıyla güncellendi!');

            if (updatedProduct) {
                onProductUpdated(updatedProduct);
            }

            // Go back after 2 seconds
            setTimeout(() => {
                onBack();
            }, 2000);

        } catch (error: any) {
            setStatus('error');
            setMessage(`❌ Hata: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-screen bg-gray-50 overflow-y-auto">
            <div className="container mx-auto px-6 max-w-4xl py-8">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={onBack}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5"/>
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Ürün Düzenle</h1>
                                <p className="text-gray-600">Ürün bilgilerini güncelleyin</p>
                            </div>
                        </div>

                        {status !== 'idle' && (
                            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                                status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {status === 'success' ? (
                                    <CheckCircle className="w-5 h-5"/>
                                ) : (
                                    <AlertCircle className="w-5 h-5"/>
                                )}
                                <span className="font-medium">{message}</span>
                            </div>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Temel Bilgiler</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title Turkish */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Başlık (Türkçe) *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title.tr}
                                    onChange={(e) => handleInputChange('title', e.target.value, 'tr')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Title English */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Başlık (İngilizce) *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title.en}
                                    onChange={(e) => handleInputChange('title', e.target.value, 'en')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Fiyat *
                                </label>
                                <div className="flex">
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => handleInputChange('price', e.target.value)}
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                    <select
                                        value={formData.currency}
                                        onChange={(e) => handleInputChange('currency', e.target.value)}
                                        className="px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                    >
                                        <option value="TRY">TRY</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                    </select>
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kategori *
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value as ProductCategory)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label[language]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Açıklama</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Açıklama (Türkçe) *
                                </label>
                                <textarea
                                    value={formData.description.tr}
                                    onChange={(e) => handleInputChange('description', e.target.value, 'tr')}
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Açıklama (İngilizce) *
                                </label>
                                <textarea
                                    value={formData.description.en}
                                    onChange={(e) => handleInputChange('description', e.target.value, 'en')}
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Images */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Ürün Görselleri</h2>

                        {/* Existing Images */}
                        {existingImages.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-md font-medium text-gray-700 mb-3">Mevcut Görseller</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {existingImages.map((imageUrl, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={imageUrl}
                                                alt={`Existing ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeExistingImage(index)}
                                                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                            >
                                                <X className="w-4 h-4"/>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* New Images Upload */}
                        <div className="space-y-4">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                            >
                                <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4"/>
                                <p className="text-lg font-medium text-gray-900 mb-2">
                                    Yeni görseller ekleyin
                                </p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleNewImageUpload}
                                    className="hidden"
                                />
                            </div>

                            {/* New Image Previews */}
                            {newImagePreviews.length > 0 && (
                                <div>
                                    <h3 className="text-md font-medium text-gray-700 mb-3">Yeni Görseller</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {newImagePreviews.map((preview, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={preview}
                                                    alt={`New ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewImage(index)}
                                                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                                >
                                                    <X className="w-4 h-4"/>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-end space-x-4">
                            <button
                                type="button"
                                onClick={onBack}
                                disabled={isSubmitting}
                                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                İptal
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader className="w-5 h-5 animate-spin"/>
                                        <span>Güncelleniyor...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5"/>
                                        <span>Değişiklikleri Kaydet</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductPage;