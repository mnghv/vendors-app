'use client';

import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Textarea,
    Select,
    SelectItem,
} from '@heroui/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useVendors } from '@/contexts/VendorContext';
import { Vendor } from '@/contexts/VendorContext';
import { LoadingOverlay } from '@/components/SkeletonLoader';

interface VendorModalProps {
    isOpen: boolean;
    onClose: () => void;
    vendor?: Vendor | null;
    mode: 'add' | 'edit';
}

interface FormData {
    brandName: {
        fa: string;
        en: string;
    };
    ownerName: {
        fa: string;
        en: string;
    };
    phoneNumber: string;
    logoUrl: string;
    status: 'active' | 'inactive' | 'pending';
    location: {
        lat: number;
        lng: number;
        address: {
            fa: string;
            en: string;
        };
    };
}

interface FormErrors {
    brandNameFa?: string;
    brandNameEn?: string;
    ownerNameFa?: string;
    ownerNameEn?: string;
    phoneNumber?: string;
}

export function VendorModal({
    isOpen,
    onClose,
    vendor,
    mode,
}: VendorModalProps) {
    const { t, isRTL, language } = useLanguage();
    const { addVendor, updateVendor } = useVendors();

    const [formData, setFormData] = useState<FormData>({
        brandName: { fa: '', en: '' },
        ownerName: { fa: '', en: '' },
        phoneNumber: '',
        logoUrl: '',
        status: 'active',
        location: {
            lat: 35.6892,
            lng: 51.389,
            address: { fa: '', en: '' },
        },
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (vendor && mode === 'edit') {
            setFormData({
                brandName: vendor.brandName,
                ownerName: vendor.ownerName,
                phoneNumber: vendor.phoneNumber,
                logoUrl: vendor.logoUrl,
                status: vendor.status,
                location: vendor.location,
            });
        } else {
            setFormData({
                brandName: { fa: '', en: '' },
                ownerName: { fa: '', en: '' },
                phoneNumber: '',
                logoUrl: '',
                status: 'active',
                location: {
                    lat: 35.6892,
                    lng: 51.389,
                    address: { fa: '', en: '' },
                },
            });
        }
        setErrors({});
    }, [vendor, mode, isOpen]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.brandName.fa.trim()) {
            newErrors.brandNameFa = t('modal.validation.brandNameRequired');
        }
        if (!formData.brandName.en.trim()) {
            newErrors.brandNameEn = t(
                'modal.validation.brandNameEnglishRequired'
            );
        }
        if (!formData.ownerName.fa.trim()) {
            newErrors.ownerNameFa = t('modal.validation.ownerNameRequired');
        }
        if (!formData.ownerName.en.trim()) {
            newErrors.ownerNameEn = t(
                'modal.validation.ownerNameEnglishRequired'
            );
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = t('modal.validation.phoneNumberRequired');
        } else if (!/^09\d{9}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = t('modal.validation.phoneNumberInvalid');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            if (mode === 'add') {
                addVendor({
                    username: `vendor${Date.now()}`,
                    brandName: formData.brandName,
                    ownerName: formData.ownerName,
                    phoneNumber: formData.phoneNumber,
                    logoUrl:
                        formData.logoUrl ||
                        `https://avatar.iran.liara.run/public/girl?username=${encodeURIComponent(formData.brandName.en)}`,
                    status: formData.status,
                    location: formData.location,
                });
            } else if (vendor) {
                updateVendor({
                    ...vendor,
                    brandName: formData.brandName,
                    ownerName: formData.ownerName,
                    phoneNumber: formData.phoneNumber,
                    logoUrl: formData.logoUrl,
                    status: formData.status,
                    location: formData.location,
                });
            }
            onClose();
        } catch (error) {
            console.error('Error saving vendor:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (
        field: string,
        value: string,
        lang?: 'fa' | 'en'
    ) => {
        if (lang) {
            setFormData((prev) => ({
                ...prev,
                [field]: {
                    ...(prev[field as keyof FormData] as any),
                    [lang]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const handleAddressChange = (value: string, lang: 'fa' | 'en') => {
        setFormData((prev) => ({
            ...prev,
            location: {
                ...prev.location,
                address: {
                    ...prev.location.address,
                    [lang]: value,
                },
            },
        }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size='2xl'
            scrollBehavior='inside'>
            <ModalContent className='relative'>
                <LoadingOverlay isVisible={isSubmitting} />
                <ModalHeader className='flex flex-col gap-1'>
                    {mode === 'add'
                        ? t('modal.addNewVendor')
                        : t('modal.editVendor')}
                </ModalHeader>
                <ModalBody>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* Brand Name */}
                        <Input
                            label={t('modal.brandNamePersian')}
                            placeholder={t('modal.brandNamePersianPlaceholder')}
                            value={formData.brandName.fa}
                            onChange={(e) =>
                                handleInputChange(
                                    'brandName',
                                    e.target.value,
                                    'fa'
                                )
                            }
                            isInvalid={!!errors.brandNameFa}
                            errorMessage={errors.brandNameFa}
                            dir='rtl'
                        />
                        <Input
                            label={t('modal.brandNameEnglish')}
                            placeholder={t('modal.brandNameEnglishPlaceholder')}
                            value={formData.brandName.en}
                            onChange={(e) =>
                                handleInputChange(
                                    'brandName',
                                    e.target.value,
                                    'en'
                                )
                            }
                            isInvalid={!!errors.brandNameEn}
                            errorMessage={errors.brandNameEn}
                        />

                        {/* Owner Name */}
                        <Input
                            label={t('modal.ownerNamePersian')}
                            placeholder={t('modal.ownerNamePersianPlaceholder')}
                            value={formData.ownerName.fa}
                            onChange={(e) =>
                                handleInputChange(
                                    'ownerName',
                                    e.target.value,
                                    'fa'
                                )
                            }
                            isInvalid={!!errors.ownerNameFa}
                            errorMessage={errors.ownerNameFa}
                            dir='rtl'
                        />
                        <Input
                            label={t('modal.ownerNameEnglish')}
                            placeholder={t('modal.ownerNameEnglishPlaceholder')}
                            value={formData.ownerName.en}
                            onChange={(e) =>
                                handleInputChange(
                                    'ownerName',
                                    e.target.value,
                                    'en'
                                )
                            }
                            isInvalid={!!errors.ownerNameEn}
                            errorMessage={errors.ownerNameEn}
                        />

                        {/* Phone Number */}
                        <Input
                            label={t('modal.phoneNumber')}
                            placeholder={t('modal.phoneNumberPlaceholder')}
                            value={formData.phoneNumber}
                            onChange={(e) =>
                                handleInputChange('phoneNumber', e.target.value)
                            }
                            isInvalid={!!errors.phoneNumber}
                            errorMessage={errors.phoneNumber}
                        />

                        {/* Status */}
                        <Select
                            label='Status'
                            selectedKeys={[formData.status]}
                            onChange={(e) =>
                                handleInputChange('status', e.target.value)
                            }>
                            <SelectItem key='active'>
                                {t('vendor.status.active')}
                            </SelectItem>
                            <SelectItem key='inactive'>
                                {t('vendor.status.inactive')}
                            </SelectItem>
                            <SelectItem key='pending'>
                                {t('vendor.status.pending')}
                            </SelectItem>
                        </Select>

                        {/* Logo URL */}
                        <Input
                            label={t('modal.logoUrl')}
                            placeholder={t('modal.logoUrlPlaceholder')}
                            value={formData.logoUrl}
                            onChange={(e) =>
                                handleInputChange('logoUrl', e.target.value)
                            }
                            className='md:col-span-2'
                        />

                        {/* Location Address */}
                        <Input
                            label={t('modal.addressPersian')}
                            placeholder={t('modal.addressPersianPlaceholder')}
                            value={formData.location.address.fa}
                            onChange={(e) =>
                                handleAddressChange(e.target.value, 'fa')
                            }
                            dir='rtl'
                        />
                        <Input
                            label={t('modal.addressEnglish')}
                            placeholder={t('modal.addressEnglishPlaceholder')}
                            value={formData.location.address.en}
                            onChange={(e) =>
                                handleAddressChange(e.target.value, 'en')
                            }
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant='flat' onPress={onClose}>
                        {t('modal.cancel')}
                    </Button>
                    <Button
                        color='primary'
                        onPress={handleSubmit}
                        isLoading={isSubmitting}>
                        {mode === 'add' ? t('modal.add') : t('modal.update')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
