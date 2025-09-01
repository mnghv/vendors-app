'use client';

import React, { useMemo } from 'react';
import { Card, CardBody } from '@heroui/react';
import { useLanguage } from '@/contexts/LanguageContext';

// Main page skeleton loader
export function PageSkeleton() {
    const statsCards = useMemo(() => [1, 2, 3], []);
    const vendorCards = useMemo(() => [1, 2, 3, 4, 5, 6], []);

    return (
        <div className='min-h-screen bg-background'>
            {/* Navbar Skeleton */}
            <div className='sticky top-0 z-40 w-full border-b border-default-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                <div className='container mx-auto px-4'>
                    <div className='flex h-16 items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className='w-8 h-8 bg-default-200 rounded animate-pulse'></div>
                            <div className='w-16 h-6 bg-default-200 rounded animate-pulse'></div>
                        </div>
                        <div className='hidden sm:flex items-center gap-4'>
                            <div className='w-64 h-10 bg-default-200 rounded animate-pulse'></div>
                            <div className='w-8 h-8 bg-default-200 rounded animate-pulse'></div>
                            <div className='w-8 h-8 bg-default-200 rounded animate-pulse'></div>
                            <div className='w-8 h-8 bg-default-200 rounded animate-pulse'></div>
                        </div>
                        <div className='sm:hidden flex items-center gap-2'>
                            <div className='w-8 h-8 bg-default-200 rounded animate-pulse'></div>
                            <div className='w-8 h-8 bg-default-200 rounded animate-pulse'></div>
                            <div className='w-8 h-8 bg-default-200 rounded animate-pulse'></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className='px-6 py-4'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                    {statsCards.map((i) => (
                        <Card key={i} className='animate-pulse'>
                            <CardBody className='p-4'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <div className='h-4 bg-default-200 rounded w-24 mb-2'></div>
                                        <div className='h-8 bg-default-200 rounded w-12'></div>
                                    </div>
                                    <div className='w-8 h-8 bg-default-200 rounded'></div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className='flex flex-col lg:flex-row px-6 pb-6 gap-6'>
                {/* Vendor List Skeleton */}
                <div className='w-full lg:w-1/2 bg-background rounded-lg shadow-sm border border-default-200'>
                    <div className='h-[60vh] lg:h-[calc(100vh-200px)] p-4'>
                        {/* Header Skeleton */}
                        <div className='flex flex-col lg:flex-row items-stretch lg:items-center justify-between mb-4 p-4 bg-default-50 rounded-lg gap-4'>
                            <div className='flex-1 lg:max-w-sm'>
                                <div className='h-10 bg-default-200 rounded animate-pulse'></div>
                            </div>
                            <div className='h-10 w-32 bg-default-200 rounded animate-pulse'></div>
                        </div>

                        {/* Results count skeleton */}
                        <div className='mb-4'>
                            <div className='h-4 bg-default-200 rounded w-48 animate-pulse'></div>
                        </div>

                        {/* Vendor cards skeleton */}
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                            {vendorCards.map((i) => (
                                <VendorCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Map Skeleton */}
                <div className='w-full lg:w-1/2 bg-background rounded-lg shadow-sm border border-default-200 overflow-hidden'>
                    <div className='h-[40vh] lg:h-[calc(100vh-200px)] bg-default-100 flex items-center justify-center'>
                        <div className='text-center'>
                            <div className='w-16 h-16 bg-default-200 rounded-full animate-pulse mx-auto mb-4'></div>
                            <div className='h-4 bg-default-200 rounded w-32 animate-pulse'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Individual vendor card skeleton
export function VendorCardSkeleton() {
    return (
        <Card className='animate-pulse'>
            <CardBody className='p-4'>
                <div className='flex items-start justify-between'>
                    <div className='flex items-start space-x-3 flex-1'>
                        <div className='w-12 h-12 bg-default-200 rounded-full flex-shrink-0'></div>
                        <div className='flex-1 min-w-0'>
                            <div className='h-5 bg-default-200 rounded w-3/4 mb-2'></div>
                            <div className='h-4 bg-default-200 rounded w-1/2 mb-1'></div>
                            <div className='h-4 bg-default-200 rounded w-2/3 mb-2'></div>
                            <div className='h-6 bg-default-200 rounded w-16'></div>
                        </div>
                    </div>
                    <div className='flex items-center gap-1 flex-shrink-0'>
                        <div className='w-8 h-8 bg-default-200 rounded'></div>
                        <div className='w-8 h-8 bg-default-200 rounded'></div>
                        <div className='w-8 h-8 bg-default-200 rounded'></div>
                        <div className='w-8 h-8 bg-default-200 rounded'></div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

// Initial loading screen with attractive animation
export function InitialLoader() {
    const { t } = useLanguage();

    return (
        <div className='fixed inset-0 bg-background flex items-center justify-center z-50'>
            <div className='text-center'>
                {/* Animated Logo */}
                <div className='relative mb-8'>
                    <div className='w-20 h-20 mx-auto mb-4 relative'>
                        {/* Rotating ring */}
                        <div className='absolute inset-0 border-4 border-primary/20 rounded-full'></div>
                        <div className='absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin'></div>

                        {/* Inner logo */}
                        <div className='absolute inset-2 bg-primary/10 rounded-full flex items-center justify-center'>
                            <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                                <span className='text-white font-bold text-lg'>
                                    A
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Brand name with typing animation */}
                <div className='mb-4'>
                    <h1 className='text-2xl font-bold text-foreground mb-2'>
                        <span className='inline-block animate-pulse'>
                            {t('header.brandName')}
                        </span>
                    </h1>
                    <div className='flex items-center justify-center gap-2'>
                        <div className='h-1 w-1 bg-primary rounded-full animate-bounce'></div>
                        <div
                            className='h-1 w-1 bg-primary rounded-full animate-bounce'
                            style={{ animationDelay: '0.1s' }}></div>
                        <div
                            className='h-1 w-1 bg-primary rounded-full animate-bounce'
                            style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>

                {/* Loading text */}
                <p className='text-default-500 text-sm animate-pulse'>
                    {t('loading.vendorPanel')}
                </p>

                {/* Progress bar */}
                <div className='w-64 h-1 bg-default-200 rounded-full mx-auto mt-6 overflow-hidden'>
                    <div className='h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse'></div>
                </div>
            </div>
        </div>
    );
}

// Simple spinner component
export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizeClasses = useMemo(
        () => ({
            sm: 'w-4 h-4',
            md: 'w-8 h-8',
            lg: 'w-12 h-12',
        }),
        []
    );

    const spinnerClass = useMemo(
        () =>
            `${sizeClasses[size]} border-2 border-primary/20 border-t-primary rounded-full animate-spin`,
        [sizeClasses, size]
    );

    return <div className={spinnerClass}></div>;
}

// Loading overlay for modals and forms
export function LoadingOverlay({ isVisible }: { isVisible: boolean }) {
    const { t } = useLanguage();

    if (!isVisible) return null;

    return (
        <div className='absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg'>
            <div className='text-center'>
                <Spinner size='lg' />
                <p className='text-sm text-default-500 mt-2'>
                    {t('loading.generic')}
                </p>
            </div>
        </div>
    );
}
