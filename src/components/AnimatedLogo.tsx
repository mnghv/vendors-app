'use client';

import React from 'react';

interface AnimatedLogoProps {
    size?: 'sm' | 'md' | 'lg';
    showAnimation?: boolean;
    className?: string;
}

export function AnimatedLogo({
    size = 'md',
    showAnimation = true,
    className = '',
}: AnimatedLogoProps) {
    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-20 h-20',
        lg: 'w-24 h-24',
    };

    const innerSizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-10 h-10',
    };

    const textSizeClasses = {
        sm: 'text-sm',
        md: 'text-lg',
        lg: 'text-xl',
    };

    return (
        <div className={`${sizeClasses[size]} relative ${className}`}>
            {/* Rotating ring */}
            <div className='absolute inset-0 border-4 border-primary/20 rounded-full'></div>
            {showAnimation && (
                <div className='absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin'></div>
            )}

            {/* Inner logo */}
            <div className='absolute inset-2 bg-primary/10 rounded-full flex items-center justify-center'>
                <div
                    className={`${innerSizeClasses[size]} bg-primary rounded-lg flex items-center justify-center`}>
                    <span
                        className={`text-white font-bold ${textSizeClasses[size]}`}>
                        V
                    </span>
                </div>
            </div>
        </div>
    );
}
