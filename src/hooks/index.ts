import {useCallback, useEffect, useMemo, useState} from 'react';
import {TranslationService} from '../services/translationService';
import {DataService} from '../services/dataService';
import {SEOService} from '../services/seoService';
import type {ContactForm, FilterOptions, Language, Product} from '../types';

// Custom hook for translation - Observer Pattern
export const useTranslation = () => {
    const [language, setLanguage] = useState<Language>('tr');
    const translationService = TranslationService.getInstance();

    const changeLanguage = useCallback((newLanguage: Language) => {
        setLanguage(newLanguage);
        translationService.setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);

        // Update URL parameter
        const url = new URL(window.location.href);
        url.searchParams.set('lang', newLanguage);
        window.history.replaceState({}, '', url.toString());
    }, [translationService]);

    const t = useCallback((key: string): string => {
        return translationService.translate(key);
    }, [translationService]);

    // Initialize language from URL or localStorage
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang') as Language;
        const storedLang = localStorage.getItem('language') as Language;

        const initialLang = urlLang || storedLang || 'tr';
        if (initialLang !== language) {
            changeLanguage(initialLang);
        }
    }, [changeLanguage, language]);

    return {language, changeLanguage, t};
};

// Custom hook for products with API integration
export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<FilterOptions>({
        category: 'all',
        priceRange: {min: '', max: ''},
        sortBy: 'newest',
        searchQuery: ''
    });
    const [favorites, setFavorites] = useState<number[]>([]);

    const dataService = DataService.getInstance();

    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const allProducts = await dataService.getProducts();
            setProducts(allProducts);
        } catch (err) {
            setError('Failed to load products');
            console.error('Error loading products:', err);
        } finally {
            setLoading(false);
        }
    }, [dataService]);

    const loadFavorites = useCallback(() => {
        const stored = localStorage.getItem('favorites');
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (error) {
                console.error('Failed to parse favorites:', error);
                setFavorites([]);
            }
        }
    }, []);

    useEffect(() => {
        loadProducts();
        loadFavorites();
    }, [loadProducts, loadFavorites]);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Category filter
        if (filters.category !== 'all') {
            result = result.filter(p => p.category === filters.category);
        }

        // Search filter
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.tr.toLowerCase().includes(query) ||
                p.title.en.toLowerCase().includes(query) ||
                p.description.tr.toLowerCase().includes(query) ||
                p.description.en.toLowerCase().includes(query) ||
                p.features.tr.some(f => f.toLowerCase().includes(query)) ||
                p.features.en.some(f => f.toLowerCase().includes(query))
            );
        }

        // Price filter
        if (filters.priceRange.min) {
            result = result.filter(p => p.price >= parseFloat(filters.priceRange.min));
        }
        if (filters.priceRange.max) {
            result = result.filter(p => p.price <= parseFloat(filters.priceRange.max));
        }

        // Sort
        switch (filters.sortBy) {
            case 'newest':
                result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                break;
            case 'oldest':
                result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                break;
            case 'priceLow':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'priceHigh':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'popular':
                result.sort((a, b) => b.views - a.views);
                break;
            default:
                break;
        }

        return result;
    }, [products, filters]);

    const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
        setFilters(prev => ({...prev, ...newFilters}));
    }, []);

    const toggleFavorite = useCallback((productId: number) => {
        setFavorites(prev => {
            const newFavorites = prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId];

            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({
            category: 'all',
            priceRange: {min: '', max: ''},
            sortBy: 'newest',
            searchQuery: ''
        });
    }, []);

    return {
        products: filteredProducts,
        allProducts: products,
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

// Custom hook for contact form with API integration
export const useContactForm = () => {
    const [form, setForm] = useState<ContactForm>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

    const dataService = DataService.getInstance();

    const updateForm = useCallback((field: keyof ContactForm, value: string) => {
        setForm(prev => ({...prev, [field]: value}));
    }, []);

    const validateForm = useCallback((): boolean => {
        return !!(form.name && form.email && form.subject && form.message);
    }, [form]);

    const submitForm = useCallback(async () => {
        if (!validateForm()) {
            setSubmitStatus('error');
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await dataService.submitContactForm(form);
            if (result.success) {
                setSubmitStatus('success');
                setForm({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    }, [dataService, form, validateForm]);

    const resetForm = useCallback(() => {
        setForm({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
        setSubmitStatus(null);
    }, []);

    return {
        form,
        updateForm,
        isSubmitting,
        submitStatus,
        submitForm,
        resetForm,
        isValid: validateForm()
    };
};

// Custom hook for SEO management
export const useSEO = (page: string) => {
    const {language} = useTranslation();
    const seoService = SEOService.getInstance();

    useEffect(() => {
        const seoData = seoService.getPageSEOData(page);
        seoService.updatePageMeta(seoData, language);

        // Generate business structured data for all pages
        seoService.generateBusinessStructuredData(language);
    }, [page, language, seoService]);

    const updateProductSEO = useCallback((product: Product) => {
        seoService.generateProductStructuredData(product, language);
    }, [seoService, language]);

    return {updateProductSEO};
};

// Custom hook for newsletter subscription
export const useNewsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'success' | 'error' | null>(null);

    const dataService = DataService.getInstance();

    const subscribe = useCallback(async () => {
        if (!email || !email.includes('@')) {
            setStatus('error');
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await dataService.subscribeNewsletter(email);
            if (result.success) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus(null), 3000);
        }
    }, [dataService, email]);

    return {
        email,
        setEmail,
        subscribe,
        isSubmitting,
        status
    };
};
