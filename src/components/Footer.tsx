'use client';

import { Link } from '@heroui/link';
import { HeartFilledIcon } from '@/components/icons';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className='w-full flex items-center justify-center py-3'>
            <Link
                isExternal
                className='flex items-center gap-1 text-current'
                href='https://nghv.ir'
                title='Nghv homepage'>
                <span className='text-default-600'>
                    {t('footer.poweredBy')}
                </span>{' '}
                <HeartFilledIcon className='text-danger size-6' />
                <p className='text-primary'>Nghv</p>
            </Link>
        </footer>
    );
}

