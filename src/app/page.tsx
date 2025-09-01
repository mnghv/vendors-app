'use client';

import React, { useState } from 'react';
import { Card, CardBody, Button, Chip } from '@heroui/react';
import { VendorList } from '@/components/VendorList';
import { VendorModal } from '@/components/VendorModal';
import { DeleteModal } from '@/components/DeleteModal';
import { Toast } from '@/components/Toast';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { PageSkeleton, InitialLoader } from '@/components/SkeletonLoader';
import { useVendors } from '@/contexts/VendorContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Vendor } from '@/contexts/VendorContext';
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/map-component'), {
    ssr: false,
    loading: () => (
        <div className='flex items-center justify-center h-full bg-default-50 rounded-lg'>
            <div className='text-center'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2'></div>
                <p className='text-sm text-default-500'>Loading map...</p>
            </div>
        </div>
    ),
});

export default function Home() {
    const { t, isRTL } = useLanguage();
    const { state, deleteVendor } = useVendors();

    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
    const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [vendorToDelete, setVendorToDelete] = useState<Vendor | null>(null);
    const [vendorToEdit, setVendorToEdit] = useState<Vendor | null>(null);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error' | 'info';
        isVisible: boolean;
    }>({
        message: '',
        type: 'info',
        isVisible: false,
    });

    // Handle initial loading
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLoading(false);
        }, 2000); // Show initial loader for 2 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleVendorSelect = (vendor: Vendor) => {
        setSelectedVendor(vendor);
    };

    const handleAddVendor = () => {
        setModalMode('add');
        setVendorToEdit(null);
        setIsVendorModalOpen(true);
    };

    const handleEditVendor = (vendor: Vendor) => {
        setModalMode('edit');
        setVendorToEdit(vendor);
        setIsVendorModalOpen(true);
    };

    const handleDeleteVendor = (vendor: Vendor) => {
        setVendorToDelete(vendor);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (vendorToDelete) {
            deleteVendor(vendorToDelete.id);
            setVendorToDelete(null);
            setIsDeleteModalOpen(false);
            showToast(t('toast.vendorDeleted'), 'success');
        }
    };

    const handleVendorModalClose = () => {
        setIsVendorModalOpen(false);
        setVendorToEdit(null);
    };

    const handleVendorModalSubmit = () => {
        setIsVendorModalOpen(false);
        setVendorToEdit(null);
        const message =
            modalMode === 'add'
                ? t('toast.vendorAdded')
                : t('toast.vendorUpdated');
        showToast(message, 'success');
    };

    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ message, type, isVisible: true });
    };

    const hideToast = () => {
        setToast((prev) => ({ ...prev, isVisible: false }));
    };

    const getStats = () => {
        const totalVendors = state.vendors.length;
        const activeVendors = state.vendors.filter(
            (v) => v.status === 'active'
        ).length;
        const uniqueRegions = new Set(
            state.vendors.map(
                (v) =>
                    `${v.location.lat.toFixed(1)},${v.location.lng.toFixed(1)}`
            )
        ).size;

        return { totalVendors, activeVendors, uniqueRegions };
    };

    const stats = getStats();

    // Show initial loader
    if (isInitialLoading) {
        return <InitialLoader />;
    }

    // Show skeleton while data is loading
    if (state.loading) {
        return <PageSkeleton />;
    }

    return (
        <div
            className='min-h-screen bg-background'
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            {/* Stats Cards */}
            <div className='lg:px-6 p-2 lg:py-4'>
                {/* Mobile/Tablet Layout - Compact Horizontal Cards */}
                <div className='flex gap-2 mb-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3'>
                    <div className='flex flex-shrink-0 bg-primary-50 border border-primary-200 rounded-lg px-3 py-2 min-w-[100px]'>
                        <div className='flex items-center gap-2'>
                            <div className=' hidden lg:block text-primary'>
                                <svg
                                    className='w-4 h-4'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'>
                                    <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                            </div>
                            <div>
                                <p className='text-xs text-primary-600 font-medium max-w-10 lg:max-w-full'>
                                    {t('page.stats.totalVendors')}
                                </p>
                                <p className='text-lg font-bold text-primary-800'>
                                    {stats.totalVendors}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='flex-shrink-0 bg-success-50 border border-success-200 rounded-lg px-3 py-2 min-w-[100px]'>
                        <div className='flex items-center gap-2'>
                            <div className='hidden lg:block text-success'>
                                <svg
                                    className='w-4 h-4'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'>
                                    <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                                    <path
                                        fillRule='evenodd'
                                        d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className='text-xs text-success-600 font-medium max-w-10 lg:max-w-full'>
                                    {t('page.stats.activeVendors')}
                                </p>
                                <p className='text-lg font-bold text-success-800'>
                                    {stats.activeVendors}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='flex-shrink-0 bg-warning-50 border border-warning-200 rounded-lg px-3 py-2 min-w-[100px]'>
                        <div className='flex items-center gap-2'>
                            <div className='hidden lg:block text-warning'>
                                <svg
                                    className='w-4 h-4'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'>
                                    <path
                                        fillRule='evenodd'
                                        d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className='text-xs text-warning-600 font-medium max-w-10 lg:max-w-full'>
                                    {t('page.stats.coveredRegions')}
                                </p>
                                <p className='text-lg font-bold text-warning-800'>
                                    {stats.uniqueRegions}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='flex flex-col lg:flex-row lg:px-6 p-2 gap-6'>
                {/* Vendor List */}
                <div className='w-full lg:w-1/2 bg-background rounded-lg shadow-sm border border-default-200'>
                    <div className='h-[60vh] lg:h-[calc(100vh-200px)]'>
                        <VendorList
                            onVendorSelect={handleVendorSelect}
                            onAddVendor={handleAddVendor}
                            onEditVendor={handleEditVendor}
                            onDeleteVendor={handleDeleteVendor}
                            onShowToast={showToast}
                        />
                    </div>
                </div>

                {/* Map */}
                <div className='w-full lg:w-1/2 bg-background rounded-lg shadow-sm border border-default-200 overflow-hidden'>
                    <div className='h-[40vh] lg:h-[calc(100vh-200px)]'>
                        <MapComponent
                            selectedVendor={selectedVendor}
                            onVendorSelect={handleVendorSelect}
                        />
                    </div>
                </div>
            </div>

            {/* Modals */}
            <VendorModal
                isOpen={isVendorModalOpen}
                onClose={handleVendorModalClose}
                vendor={vendorToEdit}
                mode={modalMode}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                vendor={vendorToDelete}
                onConfirm={handleConfirmDelete}
            />

            {/* Toast */}
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={hideToast}
            />
        </div>
    );
}
