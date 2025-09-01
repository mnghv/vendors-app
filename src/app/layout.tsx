import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import { Link } from '@heroui/link';
import clsx from 'clsx';

import { Providers } from './providers';
import { VendorProvider } from '@/contexts/VendorContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: '/favicon.ico',
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning>
            <head />
            <body
                className={clsx(
                    'min-h-screen text-foreground bg-background font-sans antialiased',
                    fontSans.variable
                )}>
                <Providers
                    themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
                    <LanguageProvider>
                        <VendorProvider>
                            <div className='relative flex flex-col h-screen'>
                                <Navbar />
                                <main className='w-full mx-auto pt-10 pb-2 px-3 sm:px-4 lg:px-6 flex-grow'>
                                    {children}
                                </main>
                                <Footer />
                            </div>
                        </VendorProvider>
                    </LanguageProvider>
                </Providers>
            </body>
        </html>
    );
}
