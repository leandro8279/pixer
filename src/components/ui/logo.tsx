import cn from 'classnames';
import { Observer } from 'mobx-react-lite';
import { useWindowSize } from 'react-use';
import { Link } from 'wouter';

import { RenderComponent } from '@/components/common/render-component';
import { useRootStore } from '@/contexts/root';
import { siteSettings } from '@/settings/site.settings';
import { RESPONSIVE_WIDTH } from '@/utils/constants';

interface Props {
  className?: string;
}

export function Logo({ className }: Props) {
  const app = useRootStore('app');
  const { width } = useWindowSize();
  const setting = useRootStore('setting');

  return (
    <Link
      href={siteSettings?.logo?.href}
      className={cn('inline-flex items-center gap-3', className)}
    >
      <Observer>
        {() => (
          <RenderComponent conditional={app.miniSidebar && width >= RESPONSIVE_WIDTH}>
            <span
              className="relative overflow-hidden "
              style={{ width: siteSettings.collapseLogo.width, height: siteSettings.collapseLogo.height }}
            >
              <div className="relative h-full w-full">
                <img
                  src={setting.settings?.options?.collapseLogo?.original ?? siteSettings.collapseLogo.url}
                  alt={setting.settings?.options?.siteTitle ?? siteSettings.collapseLogo.alt}
                  className="absolute inset-0 h-full w-full object-contain"
                  loading="eager"
                />
              </div>
            </span>
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={!Boolean(app.miniSidebar && width >= RESPONSIVE_WIDTH)}>
            <span
              className="relative overflow-hidden "
              style={{ width: siteSettings.logo.width, height: siteSettings.logo.height }}
            >
              <div className="relative h-full w-full">
                <img
                  src={setting.settings?.options?.collapseLogo?.original ?? siteSettings.collapseLogo.url}
                  alt={setting.settings?.options?.siteTitle ?? siteSettings.collapseLogo.alt}
                  className="absolute inset-0 h-full w-full pl-4 object-contain object-left"
                  loading="eager"
                />
              </div>
            </span>
          </RenderComponent>
        )}
      </Observer>
    </Link>
  );
}
