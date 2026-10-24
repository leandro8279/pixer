import { useTranslation } from 'react-i18next';
import { Link, useLocation, useSearchParams } from 'wouter';

import { HomeIcon } from '@/components/icons/home-icon';
import { Routes } from '@/config/routes';

export function VisitStore() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const [searchParams] = useSearchParams();

  const slug = (location === '/[shop]' && `authors/${searchParams.get('shop')}`) || '/';

  return (
    <Link
      href={Routes.visitStore(slug as string)}
      target="_blank"
      className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-0 text-sm font-medium leading-none text-accent outline-none transition duration-300 ease-in-out hover:border-transparent hover:bg-accent-hover hover:text-white focus:shadow focus:outline-none"
      rel="noreferrer"
    >
      <HomeIcon />
      {slug === '/' ? t('text-visit-site') : t('text-visit-store')}
    </Link>
  );
}
