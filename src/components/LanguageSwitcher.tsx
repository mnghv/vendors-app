'use client';

import React from 'react';
import {
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@heroui/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
    const { language, setLanguage, isRTL } = useLanguage();

    const languages = [
        { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
    ];

    const currentLanguage = languages.find((lang) => lang.code === language);

    const handleLanguageChange = (selectedKey: Language) => {
        setLanguage(selectedKey);
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant='flat' size='sm' className='min-w-0'>
                    <span className='mr-2'>{currentLanguage?.flag}</span>
                    <span className='hidden sm:inline'>
                        {currentLanguage?.name}
                    </span>
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label='Language selection'
                selectedKeys={[language]}
                onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as Language;
                    if (selectedKey) {
                        handleLanguageChange(selectedKey);
                    }
                }}>
                {languages.map((lang) => (
                    <DropdownItem
                        key={lang.code}
                        textValue={lang.name}
                        onPress={() =>
                            handleLanguageChange(lang.code as Language)
                        }>
                        <div className='flex items-center gap-2'>
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                        </div>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}
