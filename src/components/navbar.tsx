'use client';

import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarBrand,
    NavbarItem,
} from '@heroui/navbar';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import { Input } from '@heroui/input';
import NextLink from 'next/link';
import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useVendors } from '@/contexts/VendorContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { GithubIcon, SearchIcon, Logo, XMarkIcon } from '@/components/icons';

export const Navbar = () => {
    const { state, searchVendors } = useVendors();
    const { t } = useLanguage();
    const [localSearchValue, setLocalSearchValue] = useState('');

    // Sync with global search state
    const searchValue = state.searchTerm;

    // Sync local state with global state
    useEffect(() => {
        setLocalSearchValue(state.searchTerm);
    }, [state.searchTerm]);

    const handleSearch = (value: string) => {
        setLocalSearchValue(value);
        searchVendors(value);
    };

    const clearSearch = () => {
        setLocalSearchValue('');
        searchVendors('');
    };

    const searchInput = (
        <Input
            aria-label='Search'
            classNames={{
                inputWrapper: 'bg-default-100',
                input: 'text-sm',
            }}
            endContent={
                searchValue ? (
                    <Button
                        isIconOnly
                        variant='light'
                        size='sm'
                        onPress={clearSearch}
                        className='min-w-0'>
                        <XMarkIcon className='w-4 h-4 text-default-400' />
                    </Button>
                ) : (
                    <></>
                )
            }
            labelPlacement='outside'
            placeholder={t('header.searchPlaceholder')}
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            startContent={
                <SearchIcon className='text-base text-default-400 pointer-events-none flex-shrink-0' />
            }
            type='search'
        />
    );

    return (
        <HeroUINavbar maxWidth='xl' position='sticky' className='shadow-md'>
            <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
                <NavbarBrand as='li' className='gap-3 max-w-fit'>
                    <NextLink
                        className='flex justify-start items-center gap-1'
                        href='/'>
                        <Logo />
                        <p className='font-bold text-inherit'>
                            {t('header.brandName')}
                        </p>
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent
                className='hidden sm:flex basis-1/5 sm:basis-full'
                justify='center'>
                <NavbarItem className='hidden lg:flex max-w-lg'>
                    {searchInput}
                </NavbarItem>
            </NavbarContent>

            <NavbarContent
                className='hidden sm:flex basis-1/5 sm:basis-full'
                justify='end'>
                <NavbarItem className='hidden sm:flex gap-2'>
                    <LanguageSwitcher />
                    <ThemeSwitch />{' '}
                    <Link
                        isExternal
                        aria-label='Github'
                        href={siteConfig.links.github}>
                        <GithubIcon className='text-default-500' />
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className='sm:hidden basis-1 pl-4' justify='end'>
                <LanguageSwitcher />
                <ThemeSwitch />
                
            </NavbarContent>
        </HeroUINavbar>
    );
};
