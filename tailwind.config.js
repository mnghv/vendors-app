import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                fontFamily: {
                    sans: ['var(--font-sans)', 'sans-serif', 'Arial'],
                    mono: ['var(--font-mono)', 'monospace'],
                    persian: [
                        'var(--font-persian)',
                        'Vazir',
                        'Tahoma',
                        'Arial',
                        'sans-serif',
                    ],
                },
            },
        },
    },
    darkMode: 'class',
    plugins: [heroui()],
};

module.exports = config;
