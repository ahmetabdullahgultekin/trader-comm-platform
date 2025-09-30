// Enum'lar ve sabitler - Hardcoded string'lerin yerini alacak

export const PhoneType = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    WHATSAPP: 'whatsapp',
    DISPLAY: 'display'
} as const;

export const EmailType = {
    PRIMARY: 'primary',
    BUSINESS: 'business',
    SUPPORT: 'support'
} as const;

export const Language = {
    TR: 'tr',
    EN: 'en'
} as const;

export const SocialPlatform = {
    WHATSAPP: 'whatsapp',
    LINKEDIN: 'linkedin',
    INSTAGRAM: 'instagram',
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    YOUTUBE: 'youtube'
} as const;

export const BusinessArea = {
    REAL_ESTATE: 'realEstate',
    AGRICULTURE: 'agriculture',
    VEHICLES: 'vehicles',
    CONSTRUCTION: 'construction',
    INVESTMENT: 'investment',
    PROJECT_DEVELOPMENT: 'projectDevelopment',
    TURKEY_WIDE: 'turkeyWide',
    ANKARA_SURROUNDINGS: 'ankaraSurroundings',
    ISTANBUL_REGION: 'istanbulRegion',
    IZMIR_EGEAN_REGION: 'izmirEgeanRegion',
    ANTALYA_MEDITERRANEAN_REGION: 'antalyaMediterraneanRegion'
} as const;

export const RouteKey = {
    HOME: '/',
    PRODUCTS: '/urunler',
    ABOUT: '/hakkimda',
    PARTNERS: '/is-ortaklarimiz',
    CONTACT: '/iletisim',
    BLOG: '/blog',
    FAVORITES: '/favoriler',
    COMPARE: '/karsilastir',
    ADMIN: '/admin',
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_PRODUCTS: '/admin/urunler',
    ADMIN_ADD_PRODUCT: '/admin/urun-ekle',
    ADMIN_EDIT_PRODUCT: '/admin/urun-duzenle'
} as const;

export const ColorTheme = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    ACCENT: 'accent',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
} as const;

export const ImageType = {
    LOGO_PRIMARY: 'logoPrimary',
    LOGO_SECONDARY: 'logoSecondary',
    FAVICON: 'favicon',
    PROFILE: 'profile',
    COVER: 'cover'
} as const;

// Type definitions
export type PhoneTypeValue = typeof PhoneType[keyof typeof PhoneType];
export type EmailTypeValue = typeof EmailType[keyof typeof EmailType];
export type LanguageValue = typeof Language[keyof typeof Language];
export type SocialPlatformValue = typeof SocialPlatform[keyof typeof SocialPlatform];
export type BusinessAreaValue = typeof BusinessArea[keyof typeof BusinessArea];
export type RouteKeyValue = typeof RouteKey[keyof typeof RouteKey];
export type ColorThemeValue = typeof ColorTheme[keyof typeof ColorTheme];
export type ImageTypeValue = typeof ImageType[keyof typeof ImageType];

// Sabit değerler için constants
export const CONSTANTS = {
    COMPANY: {
        FOUNDED_YEAR: 2009,
        EXPERIENCE_YEARS: 15,
        INITIALS: 'FE'
    },
    CONTACT: {
        WORKING_HOURS: {
            START: '08:00',
            END: '18:00'
        },
        WORKING_DAYS: {
            START: 1, // Monday
            END: 5    // Friday
        }
    },
    WEBSITE: {
        DOMAIN: 'https://fahrieren.com',
        DEFAULT_COUNTRY_CODE: '+90',
        WHATSAPP_BASE_URL: 'https://wa.me/',
        TEL_PREFIX: 'tel:'
    }
} as const;

// Navigation menü yapısı
export const NAVIGATION_ITEMS = [
    {key: RouteKey.HOME, translationKey: 'nav.home'},
    {key: RouteKey.PRODUCTS, translationKey: 'nav.products'},
    {key: RouteKey.ABOUT, translationKey: 'nav.about'},
    {key: RouteKey.PARTNERS, translationKey: 'nav.partners'},
    {key: RouteKey.CONTACT, translationKey: 'nav.contact'}
] as const;
