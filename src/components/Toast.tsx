'use client';

import React, { useEffect } from 'react';
import { Button } from '@heroui/react';
import { CheckIcon, XMarkIcon } from '@/components/icons';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export function Toast({
    message,
    type,
    isVisible,
    onClose,
    duration = 3000,
}: ToastProps) {
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const getToastStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-success-50 border-success-200 text-success-800';
            case 'error':
                return 'bg-danger-50 border-danger-200 text-danger-800';
            case 'info':
                return 'bg-primary-50 border-primary-200 text-primary-800';
            default:
                return 'bg-default-50 border-default-200 text-default-800';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckIcon className='w-5 h-5 text-success-600' />;
            case 'error':
                return <XMarkIcon className='w-5 h-5 text-danger-600' />;
            case 'info':
                return <CheckIcon className='w-5 h-5 text-primary-600' />;
            default:
                return null;
        }
    };

    return (
        <div className='fixed top-4 right-4 z-50 animate-in slide-in-from-right-2'>
            <div
                className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg ${getToastStyles()}`}>
                {getIcon()}
                <span className='text-sm font-medium'>{message}</span>
                <Button
                    isIconOnly
                    variant='light'
                    size='sm'
                    onPress={onClose}
                    className='flex-shrink-0'>
                    <XMarkIcon className='w-4 h-4' />
                </Button>
            </div>
        </div>
    );
}
