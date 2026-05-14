import RenderComponent from '@/components/common/render-component';
import Link from '@/components/ui/link';

import { useRootStore } from '@/contexts/root-context';

import { siteSettings } from '@/settings/site.settings';

import { RESPONSIVE_WIDTH } from '@/utils/constants';
import { useWindowSize } from '@/utils/use-window-size';

import cn from 'classnames';
import { Observer } from 'mobx-react-lite';

export function Logo({ className }: React.AnchorHTMLAttributes<object>) {
  const { app } = useRootStore();
  const { width } = useWindowSize();

  return (
    <Link href={siteSettings?.logo?.href} className={cn('inline-flex items-center gap-3', className)}>
      <Observer>
        {() => (
          <RenderComponent conditional={app.miniSidebar && width >= RESPONSIVE_WIDTH}>
            <span
              className='relative overflow-hidden '
              style={{ width: siteSettings.collapseLogo.width, height: siteSettings.collapseLogo.height }}
            >
              <img
                src={siteSettings.collapseLogo.url}
                alt={siteSettings.collapseLogo.alt}
                className='object-contain w-full h-full'
                loading='eager'
              />
            </span>
          </RenderComponent>
        )}
      </Observer>
      <Observer>
        {() => (
          <RenderComponent conditional={!(app.miniSidebar && width >= RESPONSIVE_WIDTH)}>
            <span
              className='relative overflow-hidden '
              style={{ width: siteSettings.logo.width, height: siteSettings.logo.height }}
            >
              <img
                src={siteSettings.logo.url}
                alt={siteSettings.logo.alt}
                className='object-contain w-full h-full'
                loading='eager'
              />
            </span>
          </RenderComponent>
        )}
      </Observer>
    </Link>
  );
}

export default Logo;
