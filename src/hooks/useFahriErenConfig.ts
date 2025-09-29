import {useMemo} from 'react';
import {FAHRI_EREN_CONFIG, FahriErenUtils} from '../config/fahrierenConfig';
import {useTranslation} from './index';
import type {EmailTypeValue, LanguageValue, PhoneTypeValue, SocialPlatformValue} from '../types/enums';
import {EmailType, PhoneType, SocialPlatform} from '../types/enums';

interface UseFahriErenConfigReturn {
    // Temel konfigürasyon
    config: typeof FAHRI_EREN_CONFIG;

    // İletişim bilgileri
    contact: {
        phone: (format?: PhoneTypeValue) => string;
        email: (type?: EmailTypeValue) => string;
        whatsappUrl: (message?: string) => string;
        fullAddress: () => string;
        workingHours: () => string;
        phoneUri: (type?: PhoneTypeValue) => string;
    };

    // Sosyal medya
    social: {
        getUrl: (platform: SocialPlatformValue) => string;
        whatsappUrl: (customMessage?: string) => string;
        linkedin: string;
        instagram: string;
        facebook: string;
        youtube: string;
    };

    // İş bilgileri
    business: {
        title: (language?: LanguageValue) => string;
        description: (language?: LanguageValue) => string;
        name: (language?: LanguageValue) => string;
        subtitle: (language?: LanguageValue) => string;
        specialties: (language?: LanguageValue) => string[];
    };

    // Kişisel bilgiler
    personal: typeof FAHRI_EREN_CONFIG.personal;

    // Website bilgileri
    website: typeof FAHRI_EREN_CONFIG.website;

    // İstatistikler
    stats: typeof FAHRI_EREN_CONFIG.stats;

    // Hizmet alanları
    serviceAreas: (language?: LanguageValue) => string[];

    // SEO ve yapılandırılmış veri
    seo: {
        getData: () => ReturnType<typeof FahriErenUtils.getSEOData>;
        getStructuredData: () => ReturnType<typeof FahriErenUtils.getStructuredData>;
    };

    // Utility fonksiyonları
    utils: typeof FahriErenUtils;
}

export const useFahriErenConfig = (): UseFahriErenConfigReturn => {
    const {language} = useTranslation();
    const currentLanguage = language as LanguageValue;

    return useMemo(() => ({
        config: FAHRI_EREN_CONFIG,

        contact: {
            phone: (format: PhoneTypeValue = PhoneType.DISPLAY) =>
                FahriErenUtils.getFormattedPhone(format),

            email: (type: EmailTypeValue = EmailType.PRIMARY) =>
                FahriErenUtils.getEmail(type),

            whatsappUrl: (message?: string) =>
                FahriErenUtils.getWhatsAppUrl(message, currentLanguage),

            fullAddress: () =>
                FahriErenUtils.getFullAddress(currentLanguage),

            workingHours: () =>
                FahriErenUtils.getWorkingHours(currentLanguage),

            phoneUri: (type: PhoneTypeValue = PhoneType.PRIMARY) =>
                FahriErenUtils.getPhoneUri(type),
        },

        social: {
            getUrl: (platform: SocialPlatformValue) =>
                FahriErenUtils.getSocialUrl(platform),

            whatsappUrl: (customMessage?: string) =>
                FahriErenUtils.getWhatsAppUrl(customMessage, currentLanguage),

            linkedin: FahriErenUtils.getSocialUrl(SocialPlatform.LINKEDIN),
            instagram: FahriErenUtils.getSocialUrl(SocialPlatform.INSTAGRAM),
            facebook: FahriErenUtils.getSocialUrl(SocialPlatform.FACEBOOK),
            youtube: FahriErenUtils.getSocialUrl(SocialPlatform.YOUTUBE),
        },

        business: {
            title: (lang: LanguageValue = currentLanguage) =>
                FahriErenUtils.getLocalizedContent(FAHRI_EREN_CONFIG.business.title, lang),

            description: (lang: LanguageValue = currentLanguage) =>
                FahriErenUtils.getLocalizedContent(FAHRI_EREN_CONFIG.business.description, lang),

            name: (lang: LanguageValue = currentLanguage) =>
                FahriErenUtils.getLocalizedContent(FAHRI_EREN_CONFIG.business.name, lang),

            subtitle: (lang: LanguageValue = currentLanguage) =>
                FahriErenUtils.getLocalizedContent(FAHRI_EREN_CONFIG.business.subtitle, lang),

            specialties: (lang: LanguageValue = currentLanguage) =>
                FahriErenUtils.getLocalizedContent(FAHRI_EREN_CONFIG.business.specialties, lang),
        },

        personal: FAHRI_EREN_CONFIG.personal,
        website: FAHRI_EREN_CONFIG.website,
        stats: FAHRI_EREN_CONFIG.stats,

        serviceAreas: (lang: LanguageValue = currentLanguage) =>
            FahriErenUtils.getLocalizedContent(FAHRI_EREN_CONFIG.serviceAreas, lang),

        seo: {
            getData: () => FahriErenUtils.getSEOData(currentLanguage),
            getStructuredData: () => FahriErenUtils.getStructuredData(currentLanguage),
        },

        utils: FahriErenUtils,
    }), [currentLanguage]);
};

export default useFahriErenConfig;
