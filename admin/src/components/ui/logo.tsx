import Link from '@/components/ui/link';
import cn from 'classnames';
import { siteSettings } from '@/settings/site.settings';
import { useSettings } from '@/contexts/settings.context';
import { LogoSVG } from '@/components/icons/logo';
import LogoText from '@/components/icons/logo-text';
import { useAtom } from 'jotai';
import { miniSidebarInitialValue } from '@/utils/constants';
import { useWindowSize } from '@/utils/use-window-size';
import { RESPONSIVE_WIDTH } from '@/utils/constants';
import { useRouter } from 'next/router';
import { useSettingsQuery } from '@/data/settings';
import RenderComponent from '@/components/common/render-component';

export function Logo({
  className,
  ...props
}: React.AnchorHTMLAttributes<{}>) {
  const { locale } = useRouter();
  const { settings } = useSettingsQuery({
    language: locale!,
  });
  const [miniSidebar, _] = useAtom(miniSidebarInitialValue);
  const { width } = useWindowSize();

  return (
    <Link
      href={siteSettings?.logo?.href}
      className={cn('inline-flex items-center gap-3', className)}
    >
      <RenderComponent conditional={miniSidebar && width >= RESPONSIVE_WIDTH}>
        <span
          className="relative overflow-hidden "
          style={{
            width: siteSettings.collapseLogo.width,
            height: siteSettings.collapseLogo.height,
          }}
        >
          <img
            src={
              settings?.options?.collapseLogo?.original ??
              siteSettings.collapseLogo.url
            }
            alt={settings?.options?.siteTitle ?? siteSettings.collapseLogo.alt}
            className="object-contain w-full h-full"
            loading="eager"
          />
        </span>
      </RenderComponent>
      <RenderComponent conditional={!(miniSidebar && width >= RESPONSIVE_WIDTH)}>
        <span
          className="relative overflow-hidden "
          style={{
            width: siteSettings.logo.width,
            height: siteSettings.logo.height,
          }}
        >
          <img
            src={settings?.options?.logo?.original ?? siteSettings.logo.url}
            alt={settings?.options?.siteTitle ?? siteSettings.logo.alt}
            className="object-contain w-full h-full"
            loading="eager"
          />
        </span>
      </RenderComponent>
    </Link>
  );
}

export default Logo;
