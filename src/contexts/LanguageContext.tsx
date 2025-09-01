'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import translationsData from '@/api/translations.json';

export type Language = 'fa' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    isRTL: boolean;
    t: (key: string) => string;
    translations: typeof translationsData.fa | typeof translationsData.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('fa');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Load saved language preference
        const savedLanguage = localStorage.getItem('language') as Language;
        if (
            savedLanguage &&
            (savedLanguage === 'fa' || savedLanguage === 'en')
        ) {
            setLanguageState(savedLanguage);
        }
    }, []);

    useEffect(() => {
        if (isClient) {
            // Set document direction based on language
            document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
            document.documentElement.lang = language;
        }
    }, [language, isClient]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        if (isClient) {
            // Store in localStorage for persistence
            localStorage.setItem('language', lang);
        }
    };

    const isRTL = language === 'fa';
    const translations = translationsData[language];

    // Translation function that supports nested keys like 'header.title'
    const t = (key: string): string => {
        const keys = key.split('.');
        let value: any = translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key; // Return key if translation not found
            }
        }

        return typeof value === 'string' ? value : key;
    };

    const value = {
        language,
        setLanguage,
        isRTL,
        t,
        translations,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
