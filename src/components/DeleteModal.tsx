'use client';

import React from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from '@heroui/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Vendor } from '@/contexts/VendorContext';
import { LoadingOverlay } from '@/components/SkeletonLoader';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    vendor: Vendor | null;
    onConfirm: () => void;
    isLoading?: boolean;
}

export function DeleteModal({
    isOpen,
    onClose,
    vendor,
    onConfirm,
    isLoading = false,
}: DeleteModalProps) {
    const { t, language } = useLanguage();

    if (!vendor) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent className='relative'>
                <LoadingOverlay isVisible={isLoading} />
                <ModalHeader className='flex flex-col gap-1'>
                    {t('deleteModal.title')}
                </ModalHeader>
                <ModalBody>
                    <p className='text-default-600'>
                        {t('deleteModal.message')}
                    </p>
                    <div className='mt-4 p-3 bg-default-50 rounded-lg'>
                        <p className='font-semibold'>
                            {vendor.brandName[language]}
                        </p>
                        <p className='text-sm text-default-500'>
                            {vendor.ownerName[language]}
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant='flat' onPress={onClose}>
                        {t('deleteModal.cancel')}
                    </Button>
                    <Button
                        color='danger'
                        onPress={onConfirm}
                        isLoading={isLoading}>
                        {t('deleteModal.delete')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
