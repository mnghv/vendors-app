import * as React from 'react';

import { IconSvgProps } from '@/types';

export const Logo: React.FC<IconSvgProps> = ({
    size = 36,
    width,
    height,
    ...props
}) => (
    <svg
        fill='none'
        height={size || height}
        viewBox='0 0 32 32'
        width={size || width}
        {...props}>
        <path
            clipRule='evenodd'
            d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
            fill='currentColor'
            fillRule='evenodd'
        />
    </svg>
);

export const GithubIcon: React.FC<IconSvgProps> = ({
    size = 24,
    width,
    height,
    ...props
}) => {
    return (
        <svg
            height={size || height}
            viewBox='0 0 24 24'
            width={size || width}
            {...props}>
            <path
                clipRule='evenodd'
                d='M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z'
                fill='currentColor'
                fillRule='evenodd'
            />
        </svg>
    );
};

export const MoonFilledIcon = ({
    size = 24,
    width,
    height,
    ...props
}: IconSvgProps) => (
    <svg
        aria-hidden='true'
        focusable='false'
        height={size || height}
        role='presentation'
        viewBox='0 0 24 24'
        width={size || width}
        {...props}>
        <path
            d='M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z'
            fill='currentColor'
        />
    </svg>
);

export const SunFilledIcon = ({
    size = 24,
    width,
    height,
    ...props
}: IconSvgProps) => (
    <svg
        aria-hidden='true'
        focusable='false'
        height={size || height}
        role='presentation'
        viewBox='0 0 24 24'
        width={size || width}
        {...props}>
        <g fill='currentColor'>
            <path d='M19 12a7 7 0 11-7-7 7 7 0 017 7z' />
            <path d='M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z' />
        </g>
    </svg>
);

export const HeartFilledIcon = ({
    size = 24,
    width,
    height,
    ...props
}: IconSvgProps) => (
    <svg
        aria-hidden='true'
        focusable='false'
        height={size || height}
        role='presentation'
        viewBox='0 0 24 24'
        width={size || width}
        {...props}>
        <path
            d='M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z'
            fill='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.5}
        />
    </svg>
);

export const SearchIcon = (props: IconSvgProps) => (
    <svg
        aria-hidden='true'
        fill='none'
        focusable='false'
        height='1em'
        role='presentation'
        viewBox='0 0 24 24'
        width='1em'
        {...props}>
        <path
            d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
        />
        <path
            d='M22 22L20 20'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
        />
    </svg>
);

export const MoreVerticalIcon = (props: IconSvgProps) => (
    <svg
        aria-hidden='true'
        fill='none'
        focusable='false'
        height='1em'
        role='presentation'
        viewBox='0 0 24 24'
        width='1em'
        {...props}>
        <path
            d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z'
            fill='currentColor'
        />
        <path
            d='M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z'
            fill='currentColor'
        />
        <path
            d='M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z'
            fill='currentColor'
        />
    </svg>
);

export const EditIcon = (props: IconSvgProps) => (
    <svg
        aria-hidden='true'
        fill='none'
        focusable='false'
        height='1em'
        role='presentation'
        viewBox='0 0 24 24'
        width='1em'
        {...props}>
        <path
            d='M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
        />
        <path
            d='M18.5 2.50023C18.8978 2.1025 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1025 21.5 2.50023C21.8975 2.89795 22.1211 3.43739 22.1211 4.00023C22.1211 4.56307 21.8975 5.1025 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
        />
    </svg>
);

export const DeleteIcon = (props: IconSvgProps) => (
    <svg
        aria-hidden='true'
        fill='none'
        focusable='false'
        height='1em'
        role='presentation'
        viewBox='0 0 24 24'
        width='1em'
        {...props}>
        <path
            d='M3 6H5H21'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
        />
        <path
            d='M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
        />
    </svg>
);

export const MapPinIcon = (props: IconSvgProps) => (
    <svg
        aria-hidden='true'
        fill='none'
        focusable='false'
        height='1em'
        role='presentation'
        viewBox='0 0 24 24'
        width='1em'
        {...props}>
        <path
            d='M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
        />
        <path
            d='M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
        />
    </svg>
);

export const PhoneIcon = (props: IconSvgProps) => (
    <svg
        aria-hidden='true'
        fill='none'
        focusable='false'
        height='1em'
        role='presentation'
        viewBox='0 0 24 24'
        width='1em'
        {...props}>
        <path
            d='M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1469 21.5902 20.9046 21.7335 20.6407 21.8227C20.3768 21.9119 20.0973 21.9454 19.82 21.920C16.7428 21.5856 13.787 20.5341 11.19 18.850C8.77382 17.3146 6.72533 15.2661 5.18999 12.850C3.49997 10.2412 2.44824 7.27099 2.11999 4.180C2.09456 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65178C2.82196 2.44687 3.04976 2.28321 3.30359 2.17128C3.55742 2.05935 3.83188 2.00171 4.10999 2.000H7.10999C7.59522 1.99522 8.06577 2.16708 8.43376 2.48353C8.80175 2.79999 9.04201 3.23945 9.10999 3.720C9.23662 4.68007 9.47144 5.62273 9.80999 6.530C9.94454 6.88792 9.97348 7.27675 9.89382 7.65353C9.81416 8.03031 9.62984 8.38332 9.35999 8.670L8.08999 9.940C9.51367 12.4135 11.5865 14.4863 14.06 15.910L15.33 14.640C15.6167 14.3702 15.9697 14.1858 16.3465 14.1062C16.7233 14.0265 17.1121 14.0555 17.47 14.190C18.3773 14.5286 19.3199 14.7635 20.28 14.890C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.920Z'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
        />
    </svg>
);

export const CheckIcon = (props: IconSvgProps) => (
    <svg
        aria-hidden='true'
        fill='none'
        focusable='false'
        height='1em'
        role='presentation'
        viewBox='0 0 24 24'
        width='1em'
        {...props}>
        <path
            d='M20 6L9 17L4 12'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
        />
    </svg>
);

export const XMarkIcon = (props: IconSvgProps) => (
    <svg
        aria-hidden='true'
        fill='none'
        focusable='false'
        height='1em'
        role='presentation'
        viewBox='0 0 24 24'
        width='1em'
        {...props}>
        <path
            d='M18 6L6 18M6 6L18 18'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
        />
    </svg>
);

export const PlusIcon = (props: IconSvgProps) => (
    <svg
        aria-hidden='true'
        fill='none'
        focusable='false'
        height='1em'
        role='presentation'
        viewBox='0 0 24 24'
        width='1em'
        {...props}>
        <path
            d='M12 5V19M5 12H19'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
        />
    </svg>
);
