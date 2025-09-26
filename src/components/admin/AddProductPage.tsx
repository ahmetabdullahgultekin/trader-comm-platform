import React, {useRef, useState} from 'react';
import {useTranslation} from '../../hooks';
import {productService, storageService} from '../../services/firebaseService';
import type {Product, ProductCategory} from '../../types';
import {AlertCircle, ArrowLeft, CheckCircle, Image as ImageIcon, Loader, Minus, Plus, Save, X} from 'lucide-react';

interface AddProductPageProps {
    onBack: () => void;
    onProductAdded: (product: Product) => void;
}

const AddProductPage: React.FC<AddProductPageProps> = ({onBack, onProductAdded}) => {
    const {language, t} = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: {tr: '', en: ''},
        description: {tr: '', en: ''},
        price: '',
        currency: 'TRY',
        category: 'realestate' as ProductCategory,
        location: {tr: '', en: ''},
        priceText: '',
        features: {tr: [''], en: ['']},
        specifications: [{key: '', value: ''}]
    });

    const [images, setImages] = useState<File[]>([]);
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const categories = [
        {value: 'realestate', label: {tr: 'Emlak', en: 'Real Estate'}},
        {value: 'vehicles', label: {tr: 'Araçlar', en: 'Vehicles'}},
        {value: 'construction', label: {tr: 'İnşaat Malzemeleri', en: 'Construction Materials'}},
        {value: 'farm', label: {tr: 'Çiftlik Ürünleri', en: 'Farm Products'}}
    ];

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

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (files.length > 0) {
            setImages(prev => [...prev, ...files]);

            // Create preview URLs
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    setImagePreview(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreview(prev => prev.filter((_, i) => i !== index));
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

        if (images.length === 0) {
            setMessage('En az bir ürün görseli eklemelisiniz');
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
            // First add the product to get an ID
            const productData: Omit<Product, 'id'> = {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                currency: formData.currency,
                category: formData.category,
                images: [], // Will be updated after image upload
                featured: false,
                inStock: true,
                rating: 0,
                reviews: 0,
                views: 0,
                priceText: formData.priceText || `${formData.price} ${formData.currency}`,
                location: formData.location,
                date: new Date().toISOString(),
                seller: {
                    name: 'Fahri Eren',
                    phone: '+90 532 123 45 67',
                    email: 'fahri.eren@gmail.com'
                },
                features: formData.features,
                specifications: formData.specifications
                    .filter(spec => spec.key && spec.value)
                    .reduce((acc, spec) => ({...acc, [spec.key]: spec.value}), {})
            };

            // Add product to Firebase
            const productId = await productService.addProduct(productData);

            // Upload images
            const imageUrls = await storageService.uploadMultipleImages(images, productId);

            // Update product with image URLs
            await productService.updateProduct(productId, {images: imageUrls});

            // Get the complete product data
            const completeProduct = await productService.getProduct(productId);

            setStatus('success');
            setMessage('✅ Ürün başarıyla eklendi!');

            if (completeProduct) {
                onProductAdded(completeProduct);
            }

            // Reset form after 2 seconds
            setTimeout(() => {
                resetForm();
            }, 2000);

        } catch (error: any) {
            setStatus('error');
            setMessage(`❌ Hata: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: {tr: '', en: ''},
            description: {tr: '', en: ''},
            price: '',
            currency: 'TRY',
            category: 'realestate' as ProductCategory,
            location: {tr: '', en: ''},
            priceText: '',
            features: {tr: [''], en: ['']},
            specifications: [{key: '', value: ''}]
        });
        setImages([]);
        setImagePreview([]);
        setStatus('idle');
        setMessage('');
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
                                <h1 className="text-2xl font-bold text-gray-900">Yeni Ürün Ekle</h1>
                                <p className="text-gray-600">Ürün bilgilerini eksiksiz doldurun</p>
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
                                    placeholder="Ürün başlığını Türkçe giriniz"
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
                                    placeholder="Enter product title in English"
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
                                        placeholder="0.00"
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

                            {/* Price Text */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Fiyat Metni (Opsiyonel)
                                </label>
                                <input
                                    type="text"
                                    value={formData.priceText}
                                    onChange={(e) => handleInputChange('priceText', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Örn: 2.500.000 TL veya Pazarlık"
                                />
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

                            {/* Location Turkish */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Konum (Türkçe)
                                </label>
                                <input
                                    type="text"
                                    value={formData.location.tr}
                                    onChange={(e) => handleInputChange('location', e.target.value, 'tr')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Örn: İstanbul, Türkiye"
                                />
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
                                    placeholder="Ürününüzün detaylı açıklamasını Türkçe yazınız"
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
                                    placeholder="Write detailed description in English"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Images */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Ürün Görselleri *</h2>

                        <div className="space-y-4">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                            >
                                <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4"/>
                                <p className="text-lg font-medium text-gray-900 mb-2">
                                    Görselleri buraya sürükleyin veya tıklayın
                                </p>
                                <p className="text-gray-600">
                                    JPEG, PNG, WebP formatlarında maksimum 10MB
                                </p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </div>

                            {/* Image Preview */}
                            {imagePreview.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {imagePreview.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                            >
                                                <X className="w-4 h-4"/>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Özellikler</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Turkish Features */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Özellikler (Türkçe)
                                </label>
                                <div className="space-y-3">
                                    {formData.features.tr.map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => handleFeatureChange(index, e.target.value, 'tr')}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Özellik giriniz"
                                            />
                                            {formData.features.tr.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeFeature(index, 'tr')}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <Minus className="w-4 h-4"/>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addFeature('tr')}
                                        className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4"/>
                                        <span>Özellik Ekle</span>
                                    </button>
                                </div>
                            </div>

                            {/* English Features */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Özellikler (İngilizce)
                                </label>
                                <div className="space-y-3">
                                    {formData.features.en.map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => handleFeatureChange(index, e.target.value, 'en')}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter feature"
                                            />
                                            {formData.features.en.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeFeature(index, 'en')}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <Minus className="w-4 h-4"/>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addFeature('en')}
                                        className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4"/>
                                        <span>Add Feature</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Teknik Özellikler</h2>

                        <div className="space-y-4">
                            {formData.specifications.map((spec, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={spec.key}
                                            onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Özellik adı (Örn: Alan)"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={spec.value}
                                            onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Değer (Örn: 250m²)"
                                        />
                                    </div>
                                    {formData.specifications.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeSpecification(index)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                        >
                                            <Minus className="w-4 h-4"/>
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addSpecification}
                                className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <Plus className="w-4 h-4"/>
                                <span>Özellik Ekle</span>
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-end space-x-4">
                            <button
                                type="button"
                                onClick={resetForm}
                                disabled={isSubmitting}
                                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                Sıfırla
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader className="w-5 h-5 animate-spin"/>
                                        <span>Kaydediliyor...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5"/>
                                        <span>Ürünü Kaydet</span>
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

export default AddProductPage;