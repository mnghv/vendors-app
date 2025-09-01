'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import vendorsData from '@/api/vendors.json';

export interface Vendor {
    id: string;
    username: string;
    brandName: {
        fa: string;
        en: string;
    };
    ownerName: {
        fa: string;
        en: string;
    };
    phoneNumber: string;
    location: {
        lat: number;
        lng: number;
        address: {
            fa: string;
            en: string;
        };
    };
    logoUrl: string;
    status: 'active' | 'inactive' | 'pending';
    createdAt: string;
    updatedAt: string;
}

interface VendorState {
    vendors: Vendor[];
    filteredVendors: Vendor[];
    selectedVendor: Vendor | null;
    searchTerm: string;
    loading: boolean;
    error: string | null;
}

type VendorAction =
    | { type: 'SET_VENDORS'; payload: Vendor[] }
    | { type: 'ADD_VENDOR'; payload: Vendor }
    | { type: 'UPDATE_VENDOR'; payload: Vendor }
    | { type: 'DELETE_VENDOR'; payload: string }
    | { type: 'SET_SEARCH_TERM'; payload: string }
    | { type: 'SET_SELECTED_VENDOR'; payload: Vendor | null }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'FILTER_VENDORS' };

const initialState: VendorState = {
    vendors: [],
    filteredVendors: [],
    selectedVendor: null,
    searchTerm: '',
    loading: false,
    error: null,
};

function vendorReducer(state: VendorState, action: VendorAction): VendorState {
    switch (action.type) {
        case 'SET_VENDORS':
            return {
                ...state,
                vendors: action.payload,
                filteredVendors: action.payload,
                loading: false,
            };
        case 'ADD_VENDOR':
            const newVendors = [...state.vendors, action.payload];
            return {
                ...state,
                vendors: newVendors,
                filteredVendors: newVendors.filter((vendor) => {
                    const searchTerm = state.searchTerm.toLowerCase();
                    return (
                        vendor.brandName.fa
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.brandName.en
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.ownerName.fa
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.ownerName.en
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.phoneNumber.includes(searchTerm) ||
                        vendor.location.address.fa
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.location.address.en
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.username.toLowerCase().includes(searchTerm)
                    );
                }),
            };
        case 'UPDATE_VENDOR':
            const updatedVendors = state.vendors.map((vendor) =>
                vendor.id === action.payload.id ? action.payload : vendor
            );
            return {
                ...state,
                vendors: updatedVendors,
                filteredVendors: updatedVendors.filter((vendor) => {
                    const searchTerm = state.searchTerm.toLowerCase();
                    return (
                        vendor.brandName.fa
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.brandName.en
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.ownerName.fa
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.ownerName.en
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.phoneNumber.includes(searchTerm) ||
                        vendor.location.address.fa
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.location.address.en
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.username.toLowerCase().includes(searchTerm)
                    );
                }),
            };
        case 'DELETE_VENDOR':
            const vendorsAfterDelete = state.vendors.filter(
                (vendor) => vendor.id !== action.payload
            );
            return {
                ...state,
                vendors: vendorsAfterDelete,
                filteredVendors: vendorsAfterDelete.filter((vendor) => {
                    const searchTerm = state.searchTerm.toLowerCase();
                    return (
                        vendor.brandName.fa
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.brandName.en
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.ownerName.fa
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.ownerName.en
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.phoneNumber.includes(searchTerm) ||
                        vendor.location.address.fa
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.location.address.en
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.username.toLowerCase().includes(searchTerm)
                    );
                }),
                selectedVendor:
                    state.selectedVendor?.id === action.payload
                        ? null
                        : state.selectedVendor,
            };
        case 'SET_SEARCH_TERM':
            const searchTerm = action.payload.toLowerCase();
            return {
                ...state,
                searchTerm: action.payload,
                filteredVendors: state.vendors.filter((vendor) => {
                    // Search in multiple fields
                    return (
                        vendor.brandName.fa
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.brandName.en
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.ownerName.fa
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.ownerName.en
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.phoneNumber.includes(searchTerm) ||
                        vendor.location.address.fa
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.location.address.en
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.username.toLowerCase().includes(searchTerm)
                    );
                }),
            };
        case 'SET_SELECTED_VENDOR':
            return {
                ...state,
                selectedVendor: action.payload,
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case 'FILTER_VENDORS':
            return {
                ...state,
                filteredVendors: state.vendors.filter((vendor) => {
                    const searchTerm = state.searchTerm.toLowerCase();
                    return (
                        vendor.brandName.fa
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.brandName.en
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.ownerName.fa
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.ownerName.en
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.phoneNumber.includes(searchTerm) ||
                        vendor.location.address.fa
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.location.address.en
                            .toLowerCase()
                            .includes(searchTerm) ||
                        vendor.username.toLowerCase().includes(searchTerm)
                    );
                }),
            };
        default:
            return state;
    }
}

interface VendorContextType {
    state: VendorState;
    dispatch: React.Dispatch<VendorAction>;
    addVendor: (vendor: Omit<Vendor, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateVendor: (vendor: Vendor) => void;
    deleteVendor: (id: string) => void;
    searchVendors: (term: string) => void;
    selectVendor: (vendor: Vendor | null) => void;
}

const VendorContext = createContext<VendorContextType | undefined>(undefined);

export function VendorProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(vendorReducer, initialState);

    useEffect(() => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            // Simulate API call delay
            setTimeout(() => {
                dispatch({
                    type: 'SET_VENDORS',
                    payload: vendorsData as Vendor[],
                });
            }, 1000);
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to load vendors' });
        }
    }, []);

    const addVendor = (
        vendorData: Omit<Vendor, 'id' | 'createdAt' | 'updatedAt'>
    ) => {
        const newVendor: Vendor = {
            ...vendorData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        dispatch({ type: 'ADD_VENDOR', payload: newVendor });
    };

    const updateVendor = (vendor: Vendor) => {
        const updatedVendor = {
            ...vendor,
            updatedAt: new Date().toISOString(),
        };
        dispatch({ type: 'UPDATE_VENDOR', payload: updatedVendor });
    };

    const deleteVendor = (id: string) => {
        dispatch({ type: 'DELETE_VENDOR', payload: id });
    };

    const searchVendors = (term: string) => {
        dispatch({ type: 'SET_SEARCH_TERM', payload: term });
    };

    const selectVendor = (vendor: Vendor | null) => {
        dispatch({ type: 'SET_SELECTED_VENDOR', payload: vendor });
    };

    const value = {
        state,
        dispatch,
        addVendor,
        updateVendor,
        deleteVendor,
        searchVendors,
        selectVendor,
    };

    return (
        <VendorContext.Provider value={value}>
            {children}
        </VendorContext.Provider>
    );
}

export function useVendors() {
    const context = useContext(VendorContext);
    if (context === undefined) {
        throw new Error('useVendors must be used within a VendorProvider');
    }
    return context;
}
