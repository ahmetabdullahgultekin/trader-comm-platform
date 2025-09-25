import {useCallback, useEffect, useState} from 'react';
import apiManager from '../services/apiManager';
import translationService from '../services/translationService';
import type {ContactForm, FilterOptions, Language, Product} from '../types';

// Translation hook with API Manager integration
export const useTranslation = () => {
    const [language, setLanguage] = useState<Language>('tr');

    const changeLanguage = useCallback((newLanguage: Language) => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);

        // Track language change
        apiManager.trackAnalytics('language_change', {from: language, to: newLanguage});

        // Update URL parameter
        const url = new URL(window.location.href);
        url.searchParams.set('lang', newLanguage);
        window.history.replaceState({}, '', url.toString());
    }, [language]);

    const t = useCallback((key: string): string => {
        try {
            translationService.setLanguage(language);
            return translationService.translate(key);
        } catch (error) {
            console.warn('Translation failed for key:', key);
            return key;
        }
    }, [language]);

    // Initialize language from URL or localStorage
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang') as Language;
        const storedLang = localStorage.getItem('language') as Language;

        const initialLang = urlLang || storedLang || 'tr';
        if (initialLang !== language) {
            setLanguage(initialLang);
        }
    }, []);

    return {language, changeLanguage, t};
};

// SEO Hook
export const useSEO = (pageType: string) => {
    const updateProductSEO = useCallback((product?: Product) => {
        if (product) {
            document.title = `${product.title.tr} - Fahri Eren Ticaret`;

            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', product.description.tr.substring(0, 160));
            }
        }
    }, []);

    return {
        updateProductSEO
    };
};

// Products hook with Firebase integration
export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [filters, setFilters] = useState<FilterOptions>({
        category: 'all',
        priceRange: {min: '', max: ''},
        sortBy: 'newest',
        searchQuery: ''
    });

    // Load products from Firebase
    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Try to get products from Firebase first
            try {
                const {productService} = await import('../services/firebaseService');
                const firebaseProducts = await productService.getProducts();

                if (firebaseProducts.length > 0) {
                    setAllProducts(firebaseProducts);
                    setProducts(firebaseProducts);
                    return;
                }
            } catch (firebaseError) {
                console.warn('Firebase products not available, using mock data:', firebaseError);
            }

            // Fallback to mock data if Firebase is not available
            const mockProducts: Product[] = [
                {
                    id: '1',
                    title: {tr: 'Premium Ürün 1', en: 'Premium Product 1'},
                    description: {
                        tr: 'Yüksek kaliteli premium ürün açıklaması',
                        en: 'High quality premium product description'
                    },
                    price: 299.99,
                    currency: 'TRY',
                    category: 'realestate',
                    images: ['/images/product-placeholder.svg'],
                    featured: true,
                    inStock: true,
                    rating: 4.8,
                    reviews: 156,
                    views: 0,
                    specifications: {
                        weight: '1.2kg',
                        dimensions: '30x20x10cm',
                        warranty: '2 yıl'
                    }
                },
                {
                    id: '2',
                    title: {tr: 'Kaliteli Ürün 2', en: 'Quality Product 2'},
                    description: {
                        tr: 'Güvenilir ve dayanıklı ürün açıklaması',
                        en: 'Reliable and durable product description'
                    },
                    price: 199.99,
                    currency: 'TRY',
                    category: 'vehicles',
                    images: ['/images/product-placeholder.svg'],
                    featured: true,
                    inStock: true,
                    rating: 4.5,
                    reviews: 89,
                    views: 0,
                    specifications: {
                        material: 'Premium malzeme',
                        color: 'Siyah/Beyaz',
                        warranty: '1 yıl'
                    }
                }
            ];

            setAllProducts(mockProducts);
            setProducts(mockProducts);
        } catch (err: any) {
            setError(err.message || 'Beklenmeyen bir hata oluştu');
        } finally {
            setLoading(false);
        }
    }, []);

    // Apply filters
    const applyFilters = useCallback(() => {
        let filtered = [...allProducts];

        // Category filter
        if (filters.category !== 'all') {
            filtered = filtered.filter(product => product.category === filters.category);
        }

        // Search filter
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            filtered = filtered.filter(product =>
                product.title.tr.toLowerCase().includes(query) ||
                product.title.en.toLowerCase().includes(query) ||
                product.description.tr.toLowerCase().includes(query) ||
                product.description.en.toLowerCase().includes(query)
            );
        }

        // Price range filter
        if (filters.priceRange.min) {
            filtered = filtered.filter(product => product.price >= parseFloat(filters.priceRange.min));
        }
        if (filters.priceRange.max) {
            filtered = filtered.filter(product => product.price <= parseFloat(filters.priceRange.max));
        }

        // Sorting
        filtered.sort((a, b) => {
            switch (filters.sortBy) {
                case 'priceLow':
                    return a.price - b.price;
                case 'priceHigh':
                    return b.price - a.price;
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0);
                case 'popular':
                    return (b.views || 0) - (a.views || 0);
                default:
                    return 0;
            }
        });

        setProducts(filtered);
    }, [allProducts, filters]);

    // Update filters
    const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
        setFilters(prev => ({...prev, ...newFilters}));

        // Track filter usage
        apiManager.trackAnalytics('filter_applied', newFilters);
    }, []);

    // Clear filters
    const clearFilters = useCallback(() => {
        const defaultFilters: FilterOptions = {
            category: 'all',
            priceRange: {min: '', max: ''},
            sortBy: 'newest',
            searchQuery: ''
        };
        setFilters(defaultFilters);
    }, []);

    // Favorites management
    const toggleFavorite = useCallback((productId: string) => {
        setFavorites(prev => {
            const newFavorites = prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId];

            localStorage.setItem('favorites', JSON.stringify(newFavorites));

            // Track favorite action
            apiManager.trackAnalytics('favorite_toggle', {
                productId,
                action: newFavorites.includes(productId) ? 'add' : 'remove'
            });

            return newFavorites;
        });
    }, []);

    // Load favorites from localStorage
    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    // Apply filters when filters change
    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    // Load products on mount
    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    return {
        products,
        allProducts,
        loading,
        error,
        filters,
        updateFilters,
        clearFilters,
        favorites,
        toggleFavorite,
        refetch: loadProducts
    };
};

// Newsletter hook with API Manager integration
export const useNewsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const subscribe = useCallback(async () => {
        if (!email || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const response = await apiManager.subscribeNewsletter(email);

            if (response.success) {
                setStatus('success');
                setEmail('');

                // Track successful subscription
                apiManager.trackAnalytics('newsletter_subscribe', {email});
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
            console.error('Newsletter subscription error:', error);
        } finally {
            setIsSubmitting(false);
        }

        // Reset status after 3 seconds
        setTimeout(() => setStatus('idle'), 3000);
    }, [email, isSubmitting]);

    return {
        email,
        setEmail,
        subscribe,
        isSubmitting,
        status
    };
};

// Contact form hook
export const useContactForm = () => {
    const [formData, setFormData] = useState<ContactForm>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const updateField = useCallback((field: keyof ContactForm, value: string) => {
        setFormData(prev => ({...prev, [field]: value}));
    }, []);

    const submitForm = useCallback(async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const response = await apiManager.sendContactMessage(formData);

            if (response.success) {
                setStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });

                // Track form submission
                apiManager.trackAnalytics('contact_form_submit', {subject: formData.subject});
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
            console.error('Contact form error:', error);
        } finally {
            setIsSubmitting(false);
        }

        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
    }, [formData, isSubmitting]);

    const resetForm = useCallback(() => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
        setStatus('idle');
    }, []);

    return {
        formData,
        updateField,
        submitForm,
        resetForm,
        isSubmitting,
        status
    };
};