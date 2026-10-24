import { Link } from 'wouter';

import { RenderComponent } from '@/components/common/render-component';
import { Routes } from '@/config/routes';
import { useSettings } from '@/contexts/settings';

export function Footer() {
  const { siteTitle, copyrightText, externalText, externalLink } = useSettings();
  const date = new Date();

  return (
    <footer className="mt-auto bg-white shadow">
      <div className="mx-auto w-full">
        <div className="flex items-center justify-between bg-white px-5 py-6 md:px-8">
          <span className="text-sm text-body sm:text-center">
            ©{date.getFullYear()}{' '}
            <Link
              className="font-medium text-heading"
              href={externalLink ?? Routes.dashboard}
            >
              {siteTitle}
            </Link>
            . {copyrightText}{' '}
            <RenderComponent conditional={externalText}>
              <Link
                className="font-medium text-heading"
                href={externalLink ?? Routes?.dashboard}
              >
                {externalText}
              </Link>
            </RenderComponent>
          </span>
          <div className="flex space-x-6 text-sm font-medium text-body sm:justify-center">{import.meta.env.PUBLIC_VERSION}</div>
        </div>
      </div>
    </footer>
  );
}
