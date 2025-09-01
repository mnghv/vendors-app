'use client';

import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useVendors } from '@/contexts/VendorContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Vendor } from '@/contexts/VendorContext';

interface MapComponentProps {
    selectedVendor?: Vendor | null;
    onVendorSelect?: (vendor: Vendor) => void;
}

// Component to handle map view updates when selected vendor changes
function MapUpdater({ selectedVendor }: { selectedVendor: Vendor | null }) {
    const map = useMap();

    const centerPosition = useMemo(() => {
        if (!selectedVendor) return null;
        return [selectedVendor.location.lat, selectedVendor.location.lng] as [
            number,
            number,
        ];
    }, [selectedVendor]);

    useEffect(() => {
        if (centerPosition) {
            map.setView(centerPosition, 15);
        }
    }, [centerPosition, map]);

    return null;
}

// Custom marker component that can programmatically open popup
function VendorMarker({
    vendor,
    isSelected,
    onVendorSelect,
}: {
    vendor: Vendor;
    isSelected: boolean;
    onVendorSelect?: (vendor: Vendor) => void;
}) {
    const { t, language } = useLanguage();
    const markerRef = useRef<L.Marker>(null);

    const handleMarkerClick = useCallback(() => {
        onVendorSelect?.(vendor);
    }, [onVendorSelect, vendor]);

    const markerPosition = useMemo(
        () => [vendor.location.lat, vendor.location.lng] as [number, number],
        [vendor.location.lat, vendor.location.lng]
    );

    const popupContent = useMemo(
        () => ({
            direction: (language === 'fa' ? 'rtl' : 'ltr') as 'rtl' | 'ltr',
            fontFamily:
                language === 'fa'
                    ? 'Vazir, Tahoma, sans-serif'
                    : 'Inter, Arial, sans-serif',
        }),
        [language]
    );

    const statusConfig = useMemo(() => {
        const statusMap = {
            active: {
                bg: 'bg-green-100',
                text: 'text-green-700',
                label: t('vendor.status.active'),
            },
            inactive: {
                bg: 'bg-red-100',
                text: 'text-red-700',
                label: t('vendor.status.inactive'),
            },
            pending: {
                bg: 'bg-yellow-100',
                text: 'text-yellow-700',
                label: t('vendor.status.pending'),
            },
        };
        return (
            statusMap[vendor.status as keyof typeof statusMap] ||
            statusMap.pending
        );
    }, [vendor.status, t]);

    useEffect(() => {
        if (isSelected && markerRef.current) {
            markerRef.current.openPopup();
        }
    }, [isSelected]);

    return (
        <Marker
            ref={markerRef}
            position={markerPosition}
            eventHandlers={{
                click: handleMarkerClick,
            }}>
            <Popup maxWidth={280} className='custom-popup rounded-lg'>
                <div className='p-2 min-w-[250px]' style={popupContent}>
                    {/* Header */}
                    <div className='flex items-center gap-3 mb-3 pb-2 border-b border-default-200'>
                        <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                            <span className='text-primary font-bold text-sm'>
                                {vendor.brandName[language].charAt(0)}
                            </span>
                        </div>
                        <div className='flex-1 min-w-0'>
                            <h3 className='font-semibold text-sm text-foreground truncate'>
                                {vendor.brandName[language]}
                            </h3>
                            <p className='text-xs text-default-500 truncate'>
                                {vendor.ownerName[language]}
                            </p>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className='space-y-2 mb-3'>
                        <div className='flex items-center gap-2 text-xs text-default-600'>
                            <span className='font-mono'>
                                {vendor.phoneNumber}
                            </span>
                        </div>
                        <div className='text-xs text-default-500'>
                            <span className='text-xs leading-relaxed text-default-600'>
                                {vendor.location.address[language]}
                            </span>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className='mt-3 pt-2 border-t border-default-100'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs text-default-500'>
                                {t('map.status')}:
                            </span>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                                {statusConfig.label}
                            </span>
                        </div>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export default function MapComponent({
    selectedVendor,
    onVendorSelect,
}: MapComponentProps) {
    const { state } = useVendors();
    const { t } = useLanguage();

    const mapCenter = useMemo(() => [35.6892, 51.389] as LatLngExpression, []);

    const mapStyle = useMemo(
        () => ({
            height: '100%',
            width: '100%',
            zIndex: 0,
        }),
        []
    );

    const iconConfig = useMemo(
        () => ({
            iconRetinaUrl:
                'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl:
                'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl:
                'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        }),
        []
    );

    // Initialize Leaflet icons only once
    useEffect(() => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions(iconConfig);
    }, [iconConfig]);

    return (
        <div className='h-full w-full relative z-0'>
            <MapContainer
                center={mapCenter}
                zoom={10}
                scrollWheelZoom={true}
                style={mapStyle}
                className='rounded-lg'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                {/* Render vendor markers */}
                {state.vendors.map((vendor) => (
                    <VendorMarker
                        key={vendor.id}
                        vendor={vendor}
                        isSelected={selectedVendor?.id === vendor.id}
                        onVendorSelect={onVendorSelect}
                    />
                ))}

                {/* Update map view when selected vendor changes */}
                <MapUpdater selectedVendor={selectedVendor || null} />
            </MapContainer>

            {/* Map info overlay */}
            <div className='absolute top-4 left-4 bg-background bg-opacity-90 p-3 rounded-lg shadow-md z-10'>
                <h3 className='font-semibold text-sm'>{t('map.title')}</h3>
                <p className='text-xs text-default-600'>{t('map.subtitle')}</p>
                <p className='text-xs text-default-500 mt-1'>
                    {state.vendors.length} {t('map.vendorsOnMap')}
                </p>
            </div>

            {/* Map controls info */}
            <div className='absolute bottom-4 right-4 bg-background bg-opacity-90 p-2 rounded-lg shadow-md text-xs text-default-600 z-10'>
                <p>{t('map.controls.zoomInstruction')}</p>
                <p>{t('map.controls.moveInstruction')}</p>
            </div>
        </div>
    );
}
