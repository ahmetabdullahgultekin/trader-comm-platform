// API Configuration - Tek noktadan API ayarları
export const API_CONFIG = {
    // Base URLs
    BASE_URL: 'https://api.jsonbin.io/v3',
    BACKUP_URL: 'https://api.jsonstorage.net/v1',

    // JSONBin Configuration
    JSONBIN: {
        API_KEY: '$2a$10$...',  // Buraya gerçek API key'inizi ekleyin
        BIN_ID: '67123...',    // Buraya gerçek bin ID'nizi ekleyin
        MASTER_KEY: '...',     // Buraya master key'inizi ekleyin
    },

    // Endpoints
    ENDPOINTS: {
        PRODUCTS: '/bins/{binId}',
        NEWSLETTER: '/bins/{binId}/newsletter',
        CONTACT: '/bins/{binId}/contact',
        ANALYTICS: '/bins/{binId}/analytics',
    },

    // Request settings
    TIMEOUT: 10000,
    RETRY_COUNT: 3,
    RETRY_DELAY: 1000,

    // Features flags
    FEATURES: {
        OFFLINE_MODE: true,
        CACHE_ENABLED: true,
        ANALYTICS_ENABLED: true,
        ERROR_REPORTING: true,
    },

    // Contact Information
    CONTACT: {
        PHONE: '05368536265',
        EMAIL: 'fahri.eren@gmail.com',
        WHATSAPP: '05368536265',
        ADDRESS: 'İstanbul, Türkiye',
    },

    // Social Media
    SOCIAL: {
        LINKEDIN: 'https://linkedin.com/in/fahri-eren',
        TWITTER: 'https://twitter.com/fahri_eren',
        INSTAGRAM: 'https://instagram.com/fahri.eren',
    },

    // SEO Settings
    SEO: {
        SITE_NAME: 'Fahri Eren - Ticaret Platformu',
        DEFAULT_TITLE: 'Fahri Eren | Kaliteli Ürünler ve Güvenilir Ticaret',
        DEFAULT_DESCRIPTION: 'Fahri Eren ile kaliteli ürünler, güvenilir ticaret ve profesyonel hizmet. En iyi fiyatlarla en kaliteli ürünleri keşfedin.',
        DEFAULT_KEYWORDS: 'fahri eren, ticaret, kaliteli ürünler, güvenilir satış, e-ticaret',
        DEFAULT_IMAGE: '/images/og-image.jpg',
        SITE_URL: 'https://fahri-eren.com',
    }
};

// Environment-based configuration
export const getApiConfig = () => {
    const env = process.env.NODE_ENV || 'development';

    if (env === 'production') {
        return {
            ...API_CONFIG,
            BASE_URL: 'https://api.jsonbin.io/v3',
            FEATURES: {
                ...API_CONFIG.FEATURES,
                ERROR_REPORTING: true,
                ANALYTICS_ENABLED: true,
            }
        };
    }

    return {
        ...API_CONFIG,
        BASE_URL: 'https://api.jsonbin.io/v3',
        FEATURES: {
            ...API_CONFIG.FEATURES,
            ERROR_REPORTING: false,
            ANALYTICS_ENABLED: false,
        }
    };
};
