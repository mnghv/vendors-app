'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Input,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    Chip,
    Spinner,
    Tooltip,
} from '@heroui/react';
import {
    SearchIcon,
    MoreVerticalIcon,
    EditIcon,
    DeleteIcon,
    MapPinIcon,
    PhoneIcon,
    XMarkIcon,
    PlusIcon,
} from '@/components/icons';
import { useVendors } from '@/contexts/VendorContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Vendor } from '@/contexts/VendorContext';
import { VendorCardSkeleton } from '@/components/SkeletonLoader';

interface VendorListProps {
    onVendorSelect: (vendor: Vendor) => void;
    onAddVendor: () => void;
    onEditVendor: (vendor: Vendor) => void;
    onDeleteVendor: (vendor: Vendor) => void;
    onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export function VendorList({
    onVendorSelect,
    onAddVendor,
    onEditVendor,
    onDeleteVendor,
    onShowToast,
}: VendorListProps) {
    const { state, searchVendors } = useVendors();
    const { t, isRTL, language } = useLanguage();
    const [localSearchValue, setLocalSearchValue] = useState('');
    const [displayedVendors, setDisplayedVendors] = useState<Vendor[]>([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const vendorsPerPage = 6;

    // Sync with global search state
    const searchValue = state.searchTerm;

    // Sync local state with global state
    useEffect(() => {
        setLocalSearchValue(state.searchTerm);
    }, [state.searchTerm]);

    // Update displayed vendors when filtered vendors change
    useEffect(() => {
        const startIndex = 0;
        const endIndex = Math.min(vendorsPerPage, state.filteredVendors.length);
        setDisplayedVendors(state.filteredVendors.slice(startIndex, endIndex));
        setCurrentPage(1);
    }, [state.filteredVendors, vendorsPerPage]);

    // Load more vendors function
    const loadMoreVendors = async () => {
        if (
            isLoadingMore ||
            displayedVendors.length >= state.filteredVendors.length
        )
            return;

        setIsLoadingMore(true);

        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const nextPage = currentPage + 1;
        const startIndex = 0;
        const endIndex = Math.min(
            nextPage * vendorsPerPage,
            state.filteredVendors.length
        );

        setDisplayedVendors(state.filteredVendors.slice(startIndex, endIndex));
        setCurrentPage(nextPage);
        setIsLoadingMore(false);
    };

    // Handle scroll to load more
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

        if (
            isNearBottom &&
            !isLoadingMore &&
            displayedVendors.length < state.filteredVendors.length
        ) {
            loadMoreVendors();
        }
    };

    const handleSearch = useCallback(
        (value: string) => {
            setLocalSearchValue(value);
            searchVendors(value);
        },
        [searchVendors]
    );

    const clearSearch = useCallback(() => {
        setLocalSearchValue('');
        searchVendors('');
    }, [searchVendors]);

    const handleShowOnMap = useCallback(
        (vendor: Vendor) => {
            onVendorSelect(vendor);
            onShowToast(t('toast.vendorShownOnMap'), 'success');
        },
        [onVendorSelect, onShowToast, t]
    );

    const handleContact = useCallback(
        (vendor: Vendor) => {
            window.open(`tel:${vendor.phoneNumber}`);
            onShowToast(t('toast.contactInitiated'), 'info');
        },
        [onShowToast, t]
    );

    const handleEdit = useCallback(
        (vendor: Vendor) => {
            onEditVendor(vendor);
        },
        [onEditVendor]
    );

    const handleDelete = useCallback(
        (vendor: Vendor) => {
            onDeleteVendor(vendor);
        },
        [onDeleteVendor]
    );

    const getStatusColor = useCallback((status: string) => {
        const statusColorMap = {
            active: 'success',
            inactive: 'danger',
            pending: 'warning',
        } as const;
        return (
            statusColorMap[status as keyof typeof statusColorMap] || 'default'
        );
    }, []);

    // Memoize expensive computations
    const memoizedSearchValue = useMemo(
        () => localSearchValue,
        [localSearchValue]
    );

    const displayedVendorsCount = useMemo(
        () => displayedVendors.length,
        [displayedVendors.length]
    );

    const hasMoreVendors = useMemo(
        () => displayedVendorsCount < state.filteredVendors.length,
        [displayedVendorsCount, state.filteredVendors.length]
    );

    const remainingVendorsCount = useMemo(
        () => state.filteredVendors.length - displayedVendorsCount,
        [state.filteredVendors.length, displayedVendorsCount]
    );

    if (state.loading) {
        return (
            <div className='flex flex-col items-center justify-center h-64'>
                <Spinner size='lg' />
                <p className='mt-4 text-default-500'>{t('loading.title')}</p>
            </div>
        );
    }

    if (state.error) {
        return (
            <div className='flex flex-col items-center justify-center h-64'>
                <p className='text-danger'>{state.error}</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col h-full gap-4 pb-4'>
            {/* Header */}
            <div className='flex items-center justify-between p-4 bg-default-50 rounded-lg gap-4'>
                {/* Search Input */}
                <div className='flex-1 max-w-sm'>
                    <Input
                        placeholder={t('header.searchPlaceholder')}
                        value={memoizedSearchValue}
                        onChange={(e) => handleSearch(e.target.value)}
                        startContent={
                            <SearchIcon className='text-default-400' />
                        }
                        endContent={
                            memoizedSearchValue && (
                                <Button
                                    isIconOnly
                                    variant='light'
                                    size='sm'
                                    onPress={clearSearch}
                                    className='min-w-0'>
                                    <XMarkIcon className='w-4 h-4 text-default-400' />
                                </Button>
                            )
                        }
                        className='w-full'
                        size='sm'
                    />
                </div>

                {/* Add Button - Icon only on mobile, text on larger screens */}
                <Button
                    color='primary'
                    onPress={onAddVendor}
                    size='sm'
                    isIconOnly
                    className='sm:!w-auto sm:!min-w-0 px-2'>
                    <PlusIcon className='w-4 h-4' />
                    <span className='hidden sm:inline ml-2'>
                        {t('vendorList.addNewVendor')}
                    </span>
                </Button>
            </div>

            {/* Results count */}
            <div className='px-4'>
                <p className='text-sm text-default-600'>
                    {displayedVendorsCount} {t('vendorList.itemsFound')}
                    {memoizedSearchValue && (
                        <span className='text-primary ml-1'>
                            {t('vendorList.searchResultsFor')} "
                            {memoizedSearchValue}"
                        </span>
                    )}
                    {hasMoreVendors && (
                        <span className='text-default-400 ml-1'>
                            ({remainingVendorsCount}{' '}
                            {t('vendorList.moreAvailable')})
                        </span>
                    )}
                </p>
            </div>

            {/* Vendor list */}
            <div
                className='flex-1 overflow-y-auto px-4 py-2'
                onScroll={handleScroll}>
                {displayedVendors.length === 0 ? (
                    <div className='flex flex-col items-center justify-center h-64 text-center'>
                        <p className='text-default-500 mb-2'>
                            {searchValue
                                ? t('vendorList.noVendorsFound')
                                : t('vendorList.noVendorsAvailable')}
                        </p>
                        <p className='text-sm text-default-400'>
                            {searchValue
                                ? t('vendorList.searchChangeMessage')
                                : t('vendorList.addFirstVendorMessage')}
                        </p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                        {displayedVendors.map((vendor) => (
                            <Card
                                key={vendor.id}
                                className='cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border border-default-200/50'>
                                <CardBody className='p-0'>
                                    {/* Header with Avatar and Status */}
                                    <div className='relative p-4 pb-2'>
                                        <div className='flex items-start justify-between mb-3'>
                                            <div className='flex items-center gap-3'>
                                                <div className='relative'>
                                                    <Avatar
                                                        src={vendor.logoUrl}
                                                        name={
                                                            vendor.brandName[
                                                                language
                                                            ]
                                                        }
                                                        size='lg'
                                                        className='ring-2 ring-primary/20'
                                                    />
                                                    <div
                                                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                                                            vendor.status ===
                                                            'active'
                                                                ? 'bg-success'
                                                                : vendor.status ===
                                                                    'inactive'
                                                                  ? 'bg-danger'
                                                                  : 'bg-warning'
                                                        }`}></div>
                                                </div>
                                                <div className='flex-1 min-w-0'>
                                                    <Tooltip
                                                        content={
                                                            vendor.brandName[
                                                                language
                                                            ]
                                                        }>
                                                        <h3 className='font-bold text-md text-foreground mb-1 line-clamp-1'>
                                                            {
                                                                vendor
                                                                    .brandName[
                                                                    language
                                                                ]
                                                            }
                                                        </h3>
                                                    </Tooltip>
                                                    <p className='text-sm text-default-500 flex justify-start'>
                                                        {
                                                            vendor.ownerName[
                                                                language
                                                            ]
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Status Badge */}
                                            <Chip
                                                size='sm'
                                                color={getStatusColor(
                                                    vendor.status
                                                )}
                                                variant='flat'
                                                className='font-medium'>
                                                {t(
                                                    `vendor.status.${vendor.status}`
                                                )}
                                            </Chip>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className='px-4 pb-3 space-y-2'>
                                        <div className='flex items-center gap-2 text-sm text-default-600 bg-default-50 rounded-lg p-2'>
                                            <PhoneIcon className='w-4 h-4 text-primary' />
                                            <span className='font-mono text-sm'>
                                                {vendor.phoneNumber}
                                            </span>
                                        </div>
                                        <div
                                            className='text-xs text-default-500 flex items-center gap-2 bg-default-50/50 rounded-lg p-2 line-clamp-2 cursor-pointer hover:bg-default-100/50 transition-colors'
                                            onClick={() =>
                                                handleShowOnMap(vendor)
                                            }
                                            title={t(
                                                'vendor.actions.showOnMap'
                                            )}>
                                            <MapPinIcon className='w-4 h-4' />
                                            {vendor.location.address[language]}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className='px-4 pb-4'>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-1'>
                                                <Tooltip
                                                    content={t(
                                                        'vendor.actions.showOnMap'
                                                    )}
                                                    placement='top'>
                                                    <Button
                                                        isIconOnly
                                                        variant='flat'
                                                        size='sm'
                                                        onPress={() =>
                                                            handleShowOnMap(
                                                                vendor
                                                            )
                                                        }
                                                        className='min-w-0 text-primary hover:bg-primary/10'>
                                                        <MapPinIcon className='w-4 h-4' />
                                                    </Button>
                                                </Tooltip>

                                                <Tooltip
                                                    content={t(
                                                        'vendor.actions.contact'
                                                    )}
                                                    placement='top'>
                                                    <Button
                                                        isIconOnly
                                                        variant='flat'
                                                        size='sm'
                                                        onPress={() =>
                                                            handleContact(
                                                                vendor
                                                            )
                                                        }
                                                        className='min-w-0 text-success hover:bg-success/10'>
                                                        <PhoneIcon className='w-4 h-4' />
                                                    </Button>
                                                </Tooltip>
                                            </div>

                                            <div className='flex items-center gap-1'>
                                                <Tooltip
                                                    content={t(
                                                        'vendor.actions.edit'
                                                    )}
                                                    placement='top'>
                                                    <Button
                                                        isIconOnly
                                                        variant='flat'
                                                        size='sm'
                                                        onPress={() =>
                                                            handleEdit(vendor)
                                                        }
                                                        className='min-w-0 text-warning hover:bg-warning/10'>
                                                        <EditIcon className='w-4 h-4' />
                                                    </Button>
                                                </Tooltip>

                                                <Tooltip
                                                    content={t(
                                                        'vendor.actions.delete'
                                                    )}
                                                    placement='top'>
                                                    <Button
                                                        isIconOnly
                                                        variant='flat'
                                                        size='sm'
                                                        onPress={() =>
                                                            handleDelete(vendor)
                                                        }
                                                        className='min-w-0 text-danger hover:bg-danger/10'>
                                                        <DeleteIcon className='w-4 h-4' />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Loading skeleton */}
                {isLoadingMore && (
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3'>
                        <VendorCardSkeleton />
                        <VendorCardSkeleton />
                    </div>
                )}

                {/* Load more button (fallback) */}
                {!isLoadingMore &&
                    displayedVendors.length < state.filteredVendors.length && (
                        <div className='flex justify-center mt-4'>
                            <Button
                                variant='light'
                                onPress={loadMoreVendors}
                                className='text-primary'>
                                {t('vendorList.loadingMoreVendors')}
                            </Button>
                        </div>
                    )}
            </div>
        </div>
    );
}
