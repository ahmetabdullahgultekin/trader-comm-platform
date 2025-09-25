// Types for the Fahri Eren Trading Platform
export interface Product {
    id: string;
    title: LocalizedText;
    description: LocalizedText;
    price: number;
    currency: string;
    category: ProductCategory;
    images: string[];
    featured?: boolean;
    inStock: boolean;
    rating?: number;
    reviews?: number;
    views: number;
    specifications?: Record<string, string>;
    priceText?: string;
    location?: LocalizedText;
    date?: string;
    seller?: {
        name: string;
        phone?: string;
        email?: string;
    };
    features?: {
        tr: string[];
        en: string[];
    };
}

export type ProductCategory = 'realestate' | 'vehicles' | 'construction' | 'farm';

export interface LocalizedText {
    tr: string;
    en: string;
}

export interface ContactForm {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export interface FilterOptions {
    category: ProductCategory | 'all';
    priceRange: {
        min: string;
        max: string;
    };
    sortBy: SortOption;
    searchQuery: string;
}

export type SortOption = 'newest' | 'oldest' | 'priceLow' | 'priceHigh' | 'rating' | 'popular';

export type Language = 'tr' | 'en';

export interface PersonalInfo {
    name: string;
    title: LocalizedText;
    bio: LocalizedText;
    phone: string;
    email: string;
    photo?: string;
    address?: LocalizedText;
    workHours?: LocalizedText;
    socialMedia?: {
        linkedin?: string;
        twitter?: string;
        instagram?: string;
        facebook?: string;
    };
    social: {
        linkedin?: string;
        twitter?: string;
        instagram?: string;
    };
}

// Additional types for newsletter and API responses
export interface NewsletterSubscription {
    email: string;
    timestamp: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
    timestamp: number;
}

// Partner interface for partners page
export interface Partner {
    id: string;
    name: string;
    logo: string;
    description: LocalizedText;
    website?: string;
    category: string;
    services: {
        tr: string[];
        en: string[];
    };
}

// SEO related types
export interface SEOData {
    title: string;
    description: string;
    keywords: string;
    image?: string;
    url?: string;
    type?: string;
    siteName?: string;
}
