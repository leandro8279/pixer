import cn from 'classnames';
import { observer, Observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from 'react-use';

import { useRootStore } from '@/contexts/root';
import { siteSettings } from '@/settings/site.settings';
import { RESPONSIVE_WIDTH } from '@/utils/constants';

import { RenderComponent } from '../common/render-component';
import { Scrollbar } from '../ui/scrollbar';
import { Footer } from './footer';
import { MobileNavigation } from './navigation/mobile-navigation';
import { SidebarItem } from './navigation/sidebar-item';
import { TopNavBar } from './navigation/top-navbar';

interface Props {
  children: React.ReactNode;
}

interface MenuItemsProps {
  [key: string]: {
    href: string;
    label: string;
    icon: string;
    childMenu: { href: string; label: string; icon: string }[];
  };
}

const SidebarItemMap = observer(({ menuItems }: any) => {
  const { t } = useTranslation();
  const { miniSidebar } = useRootStore('app');
  const { childMenu } = menuItems;
  const { width } = useWindowSize();

  return (
    <div className="space-y-2">
      <RenderComponent conditional={childMenu?.length > 0}>
        {childMenu.map(({ href, label, icon, childMenu }: { href: string; label: string; icon: string; childMenu: any }) => (
          <SidebarItem
            href={href}
            key={label}
            label={t(label)}
            icon={icon}
            childMenu={childMenu}
            miniSidebar={miniSidebar && width >= RESPONSIVE_WIDTH}
          />
        ))}
      </RenderComponent>
    </div>
  );
});

const SideBarGroup = () => {
  const { t } = useTranslation();
  const app = useRootStore('app');
  const { width } = useWindowSize();
  const menuItems: MenuItemsProps = siteSettings.sidebarLinks.admin;
  const menuKeys = Object.keys(menuItems);

  return (
    <React.Fragment>
      {menuKeys.map((menu, index) => (
        <Observer key={index}>
          {() => (
            <div
              className={cn(
                'flex flex-col px-5',
                app.miniSidebar && width >= RESPONSIVE_WIDTH ? 'border-b border-dashed border-gray-200 py-5' : 'pt-6 pb-3',
              )}
            >
              <div
                className={cn(
                  'px-3 pb-5 text-xs font-semibold uppercase tracking-wider text-body/60',
                  app.miniSidebar && width >= RESPONSIVE_WIDTH ? 'hidden' : '',
                )}
              >
                {t(menuItems[menu]?.label)}
              </div>
              <SidebarItemMap menuItems={menuItems[menu]} />
            </div>
          )}
        </Observer>
      ))}
    </React.Fragment>
  );
};

export function AdminLayout({ children }: Props) {
  const { width } = useWindowSize();
  const [miniSidebar, _] = useState(false);
  const [underMaintenance] = useState(false);
  const [underMaintenanceStart] = useState(false);

  return (
    <div
      className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150"
      dir={'ltr'}
    >
      <TopNavBar />
      <MobileNavigation>
        <SideBarGroup />
      </MobileNavigation>

      <div className="flex flex-1">
        <aside
          className={cn(
            'fixed bottom-0 z-10 hidden h-full w-72 bg-white shadow transition-[width] duration-300 ltr:left-0 ltr:right-auto rtl:right-0 rtl:left-auto lg:block',
            width >= RESPONSIVE_WIDTH && (underMaintenance || underMaintenanceStart) ? 'lg:pt-35' : 'pt-20',
            miniSidebar && width >= RESPONSIVE_WIDTH ? 'lg:w-24' : 'lg:w-76',
          )}
        >
          <div className="sidebar-scrollbar h-full w-full overflow-x-hidden">
            <Scrollbar
              className="h-full w-full"
              options={{ scrollbars: { autoHide: 'never' } }}
            >
              <SideBarGroup />
            </Scrollbar>
          </div>
        </aside>
        <main
          className={cn(
            'relative flex w-full flex-col justify-start transition-[padding] duration-300',
            width >= RESPONSIVE_WIDTH && (underMaintenance || underMaintenanceStart) ? 'lg:pt-35' : 'pt-18 lg:pt-20',
            miniSidebar && width >= RESPONSIVE_WIDTH ?
              'ltr:lg:pl-24 rtl:lg:pr-24'
            : 'ltr:xl:pl-76 rtl:xl:pr-76 ltr:lg:pl-72 rtl:lg:pr-72 rtl:lg:pl-0',
          )}
        >
          <div className="h-full p-5 md:p-8">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
