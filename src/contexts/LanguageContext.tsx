import React, {createContext, ReactNode, useCallback, useContext, useEffect, useState} from 'react';
import translationService from '../services/translationService';
import apiManager from '../services/apiManager';
import type {Language} from '../types';

interface LanguageContextType {
    language: Language;
    changeLanguage: (newLanguage: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({children}) => {
    const [language, setLanguage] = useState<Language>('tr');

    const changeLanguage = useCallback((newLanguage: Language) => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);

        // Track language change
        try {
            apiManager.trackAnalytics('language_change', {from: language, to: newLanguage});
        } catch (error) {
            console.warn('Analytics tracking failed:', error);
        }

        // Update URL parameter
        try {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', newLanguage);
            window.history.replaceState({}, '', url.toString());
        } catch (error) {
            console.warn('URL update failed:', error);
        }
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
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const urlLang = urlParams.get('lang') as Language;
            const storedLang = localStorage.getItem('language') as Language;

            const initialLang = urlLang || storedLang || 'tr';
            if (initialLang !== language && (initialLang === 'tr' || initialLang === 'en')) {
                setLanguage(initialLang);
            }
        } catch (error) {
            console.warn('Language initialization failed:', error);
        }
    }, [language]);

    const value = {
        language,
        changeLanguage,
        t
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Backward compatibility - keep the old hook working
export const useTranslation = () => {
    return useLanguage();
};