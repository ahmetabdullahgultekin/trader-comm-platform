// Types for the Fahri Eren Trading Platform
export interface Product {
    id: number;
    category: ProductCategory;
    title: LocalizedText;
    price: number;
    priceText: string;
    images: string[];
    location: LocalizedText;
    description: LocalizedText;
    features: LocalizedFeatures;
    featured?: boolean;
    badge?: 'new' | 'sale';
    views: number;
    date: string;
    seller: string;
}

export type ProductCategory = 'realestate' | 'vehicles' | 'construction' | 'farm';

export interface LocalizedText {
    tr: string;
    en: string;
}

export interface LocalizedFeatures {
    tr: string[];
    en: string[];
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

export type SortOption = 'newest' | 'oldest' | 'priceLow' | 'priceHigh' | 'popular';

export type Language = 'tr' | 'en';

export interface Partner {
    id: string;
    name: string;
    description: LocalizedText;
    services: LocalizedFeatures;
    website?: string;
    logo: string;
}

export interface PersonalInfo {
    name: string;
    title: LocalizedText;
    bio: LocalizedText;
    photo: string;
    phone: string;
    email: string;
    address: LocalizedText;
    socialMedia: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        linkedin?: string;
    };
    workHours: LocalizedText;
}

// Newsletter subscription type
export interface NewsletterSubscription {
    email: string;
    timestamp: string;
}

// SEO Meta data type
export interface SEOData {
    title: LocalizedText;
    description: LocalizedText;
    keywords: LocalizedText;
    ogImage?: string;
    canonical?: string;
}
