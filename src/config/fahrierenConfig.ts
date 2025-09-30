// Fahri Eren - Merkezi Kişisel ve İş Bilgileri Konfigürasyonu
// Tüm kişisel ve iş bilgileri bu dosyada merkezi olarak yönetilir

import type {
    BusinessAreaValue,
    EmailTypeValue,
    LanguageValue,
    PhoneTypeValue,
    SocialPlatformValue
} from '../types/enums';
import {
    BusinessArea,
    ColorTheme,
    CONSTANTS,
    EmailType,
    ImageType,
    Language,
    PhoneType,
    SocialPlatform
} from '../types/enums';

export interface ContactInfo {
    phone: {
        [PhoneType.PRIMARY]: string;
        [PhoneType.SECONDARY]?: string;
        [PhoneType.WHATSAPP]: string;
        [PhoneType.DISPLAY]: string;
    };
    email: {
        [EmailType.PRIMARY]: string;
        [EmailType.BUSINESS]?: string;
        [EmailType.SUPPORT]?: string;
    };
    address: {
        [Language.TR]: string;
        [Language.EN]: string;
    };
    location: {
        city: string;
        country: string;
        region: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
}

export interface SocialMedia {
    [SocialPlatform.WHATSAPP]: {
        number: string;
        businessNumber?: string;
        defaultMessage: {
            [Language.TR]: string;
            [Language.EN]: string;
        };
    };
    [SocialPlatform.LINKEDIN]?: {
        url: string;
        username: string;
    };
    [SocialPlatform.INSTAGRAM]?: {
        url: string;
        username: string;
    };
    [SocialPlatform.FACEBOOK]?: {
        url: string;
        username: string;
    };
    [SocialPlatform.TWITTER]?: {
        url: string;
        username: string;
    };
    [SocialPlatform.YOUTUBE]?: {
        url: string;
        channelName: string;
    };
}

export interface BusinessInfo {
    name: {
        [Language.TR]: string;
        [Language.EN]: string;
    };
    title: {
        [Language.TR]: string;
        [Language.EN]: string;
    };
    subtitle: {
        [Language.TR]: string;
        [Language.EN]: string;
    };
    description: {
        [Language.TR]: string;
        [Language.EN]: string;
    };
    establishedYear: number;
    experience: number;
    specialties: {
        [Language.TR]: string[];
        [Language.EN]: string[];
    };
    workingHours: {
        [Language.TR]: string;
        [Language.EN]: string;
    };
    workingDays: {
        [Language.TR]: string;
        [Language.EN]: string;
    };
    areas: BusinessAreaValue[];
}

export interface WebsiteInfo {
    domain: string;
    companyName: string;
    logo: {
        [ImageType.LOGO_PRIMARY]: string;
        [ImageType.LOGO_SECONDARY]?: string;
        [ImageType.FAVICON]: string;
    };
    colors: {
        [ColorTheme.PRIMARY]: string;
        [ColorTheme.SECONDARY]: string;
        [ColorTheme.ACCENT]: string;
    };
    seo: {
        title: {
            [Language.TR]: string;
            [Language.EN]: string;
        };
        description: {
            [Language.TR]: string;
            [Language.EN]: string;
        };
        keywords: {
            [Language.TR]: string[];
            [Language.EN]: string[];
        };
    };
}

export interface LegalInfo {
    taxNumber?: string;
    commercialRegistration?: string;
    mersisNumber?: string;
    licenseNumbers?: string[];
    certifications?: {
        name: string;
        number: string;
        issuedBy: string;
        validUntil?: string;
    }[];
}

// Ana konfigürasyon objesi
export const FAHRI_EREN_CONFIG = {
    // Kişisel Bilgiler
    personal: {
        fullName: "Fahri Eren",
        firstName: "Fahri",
        lastName: "Eren",
        initials: CONSTANTS.COMPANY.INITIALS,
        profileImage: "/images/profile/fahri-eren.jpg",
        coverImage: "/images/profile/cover.jpg"
    },

    // İletişim Bilgileri
    contact: {
        phone: {
            [PhoneType.PRIMARY]: "+90 536 853 62 65",
            [PhoneType.SECONDARY]: "+90 536 853 62 65",
            [PhoneType.WHATSAPP]: "905368536265",
            [PhoneType.DISPLAY]: "+90 536 853 62 65"
        },
        email: {
            [EmailType.PRIMARY]: "fahri.eren@gmail.com",
            [EmailType.BUSINESS]: "info@fahrieren.com",
            [EmailType.SUPPORT]: "destek@fahrieren.com"
        },
        address: {
            [Language.TR]: "Kılan Köyü, Ulukışla, Niğde, Türkiye",
            [Language.EN]: "Kılan Village, Ulukışla, Niğde, Turkey"
        },
        location: {
            city: "Niğde",
            country: "Turkey",
            region: "TR",
            coordinates: {
                lat: 37.8436,
                lng: 34.6803
            }
        }
    } as ContactInfo,

    // Sosyal Medya Hesapları
    social: {
        [SocialPlatform.WHATSAPP]: {
            number: "905321234567",
            businessNumber: "905321234567",
            defaultMessage: {
                [Language.TR]: "Merhaba! Web sitenizden ulaşıyorum. Ürünleriniz hakkında bilgi almak istiyorum.",
                [Language.EN]: "Hello! I'm reaching out from your website. I'd like to get information about your products."
            }
        },
        [SocialPlatform.LINKEDIN]: {
            url: "https://linkedin.com/in/fahrieren",
            username: "fahrieren"
        },
        [SocialPlatform.INSTAGRAM]: {
            url: "https://instagram.com/fahrieren",
            username: "fahrieren"
        },
        [SocialPlatform.FACEBOOK]: {
            url: "https://facebook.com/fahrieren.official",
            username: "fahrieren.official"
        },
        [SocialPlatform.YOUTUBE]: {
            url: "https://youtube.com/@fahrieren",
            channelName: "Fahri Eren"
        }
    } as SocialMedia,

    // İş Bilgileri
    business: {
        name: {
            [Language.TR]: "Fahri Eren Ticaret",
            [Language.EN]: "Fahri Eren Trading"
        },
        title: {
            [Language.TR]: "Güvenilir Ticaret Uzmanı",
            [Language.EN]: "Reliable Trading Expert"
        },
        subtitle: {
            [Language.TR]: "Emlak, Tarım, Araç, İnşaat",
            [Language.EN]: "Real Estate, Agriculture, Vehicles, Construction"
        },
        description: {
            [Language.TR]: "1998 yılından beri ticaret sektöründe faaliyet göstermekteyim. Emlak, tarım ürünleri, araçlar ve inşaat malzemeleri alanlarında uzmanlaşmış olup, müşteri memnuniyetini öncelik olarak belirleyerek kaliteli ürün ve hizmet sunmayı ilke edindim. Eren Ticaret ve Eren Yumurta markalarımızla sektörde güvenilir bir isim haline geldik.",
            [Language.EN]: "I have been operating in the trade sector since 1998. Specializing in real estate, agricultural products, vehicles, and construction materials, I have adopted the principle of providing quality products and services by prioritizing customer satisfaction. We have become a trusted name in the sector with our brands Eren Trading and Eren Eggs."
        },
        establishedYear: CONSTANTS.COMPANY.FOUNDED_YEAR,
        experience: CONSTANTS.COMPANY.EXPERIENCE_YEARS,
        specialties: {
            [Language.TR]: [
                "Emlak Danışmanlığı",
                "Tarım Ürünleri Ticareti",
                "Araç Alım-Satımı",
                "İnşaat Malzemeleri",
                "Yatırım Danışmanlığı"
            ],
            [Language.EN]: [
                "Real Estate Consultancy",
                "Agricultural Products Trading",
                "Vehicle Buy-Sell",
                "Construction Materials",
                "Investment Consultancy"
            ]
        },
        workingHours: {
            [Language.TR]: `${CONSTANTS.CONTACT.WORKING_HOURS.START} - ${CONSTANTS.CONTACT.WORKING_HOURS.END}`,
            [Language.EN]: `${CONSTANTS.CONTACT.WORKING_HOURS.START} AM - 06:00 PM`
        },
        workingDays: {
            [Language.TR]: "Pazartesi - Cuma",
            [Language.EN]: "Monday - Friday"
        },
        areas: [
            BusinessArea.TURKEY_WIDE,
            BusinessArea.ANKARA_SURROUNDINGS,
            BusinessArea.ISTANBUL_REGION,
            BusinessArea.IZMIR_EGEAN_REGION,
            BusinessArea.ANTALYA_MEDITERRANEAN_REGION
        ]
    } as BusinessInfo,

    // Website Bilgileri
    website: {
        domain: CONSTANTS.WEBSITE.DOMAIN,
        companyName: "Fahri Eren Trading Platform",
        logo: {
            [ImageType.LOGO_PRIMARY]: "/images/logo/logo.png",
            [ImageType.LOGO_SECONDARY]: "/images/logo/logo-dark.png",
            [ImageType.FAVICON]: "/favicon.ico"
        },
        colors: {
            [ColorTheme.PRIMARY]: "#2563eb", // Blue-600
            [ColorTheme.SECONDARY]: "#1e40af", // Blue-800
            [ColorTheme.ACCENT]: "#10b981" // Green-500
        },
        seo: {
            title: {
                [Language.TR]: "Fahri Eren - Kaliteli Emlak, Araç ve Tarım Ürünleri | Türkiye",
                [Language.EN]: "Fahri Eren - Quality Real Estate, Vehicles and Agricultural Products | Turkey"
            },
            description: {
                [Language.TR]: "Türkiye'nin güvenilir ticaret platformu. Emlak, araç, tarım ürünleri ve inşaat malzemelerinde kaliteli hizmet. Fahri Eren ile güvenli alışveriş yapın.",
                [Language.EN]: "Turkey's trusted trading platform. Quality service in real estate, vehicles, agricultural products and construction materials. Shop safely with Fahri Eren."
            },
            keywords: {
                [Language.TR]: [
                    "emlak", "araç", "tarım ürünleri", "inşaat malzemeleri", "ticaret",
                    "Türkiye", "güvenilir satıcı", "fahri eren", "emlak danışmanı",
                    "araç alım satım", "tarım makineleri", "yapı malzemeleri"
                ],
                [Language.EN]: [
                    "real estate", "vehicles", "agricultural products", "construction materials",
                    "trading", "Turkey", "reliable seller", "fahri eren", "real estate consultant",
                    "car trading", "agricultural machinery", "building materials"
                ]
            }
        }
    } as WebsiteInfo,

    // Yasal Bilgiler
    legal: {
        taxNumber: "1234567890",
        commercialRegistration: "123456",
        mersisNumber: "0123456789012345",
        licenseNumbers: ["GAYRİMENKUL-2024-001", "TİCARET-2024-002"],
        certifications: [
            {
                name: "Gayrimenkul Danışmanlık Sertifikası",
                number: "GDS-2024-001",
                issuedBy: "Türkiye Gayrimenkul Federasyonu",
                validUntil: "2026-12-31"
            },
            {
                name: "Ticaret Odası Üyelik",
                number: "TO-2024-789",
                issuedBy: "Ankara Ticaret Odası",
                validUntil: "2025-12-31"
            }
        ]
    } as LegalInfo,

    // İstatistikler
    stats: {
        experience: CONSTANTS.COMPANY.EXPERIENCE_YEARS,
        happyCustomers: 500,
        completedProjects: 200,
        customerSatisfaction: 4.9,
        totalDeals: 1250000,
        averageResponseTime: 2
    },

    // Hizmet Alanları
    serviceAreas: {
        [Language.TR]: [
            "Emlak Danışmanlığı ve Yatırım",
            "Tarım Ürünleri ve Makineleri",
            "Araç Alım-Satım Hizmetleri",
            "İnşaat Malzemeleri Tedariki",
            "Yatırım Danışmanlığı",
            "Proje Geliştirme"
        ],
        [Language.EN]: [
            "Real Estate Consulting & Investment",
            "Agricultural Products & Machinery",
            "Vehicle Trading Services",
            "Construction Materials Supply",
            "Investment Consulting",
            "Project Development"
        ]
    }
};

// Utility fonksiyonları - Merkezi yönetim için
export const FahriErenUtils = {
    // Telefon numarası formatlama
    getFormattedPhone: (type: PhoneTypeValue = PhoneType.DISPLAY) => {
        const contact = FAHRI_EREN_CONFIG.contact;
        switch (type) {
            case PhoneType.PRIMARY:
                return contact.phone[PhoneType.PRIMARY].replace(/\s/g, '');
            case PhoneType.WHATSAPP:
                return contact.phone[PhoneType.WHATSAPP];
            default:
                return contact.phone[PhoneType.DISPLAY];
        }
    },

    // WhatsApp URL oluşturma
    getWhatsAppUrl: (message?: string, language: LanguageValue = Language.TR) => {
        const social = FAHRI_EREN_CONFIG.social;
        const defaultMsg = message || social[SocialPlatform.WHATSAPP].defaultMessage[language];
        return `${CONSTANTS.WEBSITE.WHATSAPP_BASE_URL}${social[SocialPlatform.WHATSAPP].number}?text=${encodeURIComponent(defaultMsg)}`;
    },

    // Email formatlama
    getEmail: (type: EmailTypeValue = EmailType.PRIMARY) => {
        return FAHRI_EREN_CONFIG.contact.email[type] || FAHRI_EREN_CONFIG.contact.email[EmailType.PRIMARY];
    },

    // Sosyal medya URL'leri
    getSocialUrl: (platform: SocialPlatformValue) => {
        const social = FAHRI_EREN_CONFIG.social[platform];
        if (!social) return '';
        return 'url' in social ? social.url : '';
    },

    // Dil bazlı içerik alma
    getLocalizedContent: <T>(content: Record<LanguageValue, T>, language: LanguageValue) => {
        return content[language] || content[Language.TR];
    },

    // SEO metadata
    getSEOData: (language: LanguageValue) => {
        const seo = FAHRI_EREN_CONFIG.website.seo;
        return {
            title: seo.title[language],
            description: seo.description[language],
            keywords: seo.keywords[language],
            domain: FAHRI_EREN_CONFIG.website.domain,
            image: `${FAHRI_EREN_CONFIG.website.domain}${FAHRI_EREN_CONFIG.personal.profileImage}`
        };
    },

    // Tam adres bilgisi
    getFullAddress: (language: LanguageValue) => {
        const contact = FAHRI_EREN_CONFIG.contact;
        return `${contact.address[language]}, ${contact.location.city}, ${contact.location.country}`;
    },

    // Çalışma saatleri
    getWorkingHours: (language: LanguageValue) => {
        const business = FAHRI_EREN_CONFIG.business;
        return `${business.workingDays[language]} ${business.workingHours[language]}`;
    },

    // Telefon URI oluşturma
    getPhoneUri: (type: PhoneTypeValue = PhoneType.PRIMARY) => {
        return `${CONSTANTS.WEBSITE.TEL_PREFIX}${FahriErenUtils.getFormattedPhone(type)}`;
    },

    // JSON-LD strukturlu veri
    getStructuredData: (language: LanguageValue) => {
        const config = FAHRI_EREN_CONFIG;
        return {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": config.personal.fullName,
            "jobTitle": config.business.title[language],
            "description": config.business.description[language],
            "url": config.website.domain,
            "image": `${config.website.domain}${config.personal.profileImage}`,
            "telephone": config.contact.phone[PhoneType.PRIMARY],
            "email": config.contact.email[EmailType.PRIMARY],
            "address": {
                "@type": "PostalAddress",
                "addressLocality": config.contact.location.city,
                "addressCountry": config.contact.location.country
            },
            "sameAs": [
                config.social[SocialPlatform.LINKEDIN]?.url,
                config.social[SocialPlatform.INSTAGRAM]?.url,
                config.social[SocialPlatform.FACEBOOK]?.url,
                config.social[SocialPlatform.YOUTUBE]?.url
            ].filter(Boolean)
        };
    }
};

export default FAHRI_EREN_CONFIG;
