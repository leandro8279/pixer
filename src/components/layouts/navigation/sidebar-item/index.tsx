import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from 'react-use';
import { Link, useLocation } from 'wouter';

import { RenderComponent } from '@/components/common/render-component';
import { ChevronRight } from '@/components/icons/chevron-right';
import * as sidebarIcons from '@/components/icons/sidebar';
import { AdvancePopover } from '@/components/ui/advance-popover';
import { useRootStore } from '@/contexts/root';
import { getAuthCredentials, hasAccess } from '@/utils/auth-utils';
import { RESPONSIVE_WIDTH } from '@/utils/constants';
import { getIcon } from '@/utils/get-icon';

import { useSidebarItem } from './useSidebarItem';

interface Props {
  href: any;
  icon: any;
  label: string;
  childMenu: [];
  miniSidebar?: boolean;
}

export function SidebarItem(props: Props) {
  const app = useRootStore('app');
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const { href, icon, label, childMenu, miniSidebar } = props;
  const { permissions: currentUserPermissions } = getAuthCredentials();
  const { shop, isOpen, sanitizedPath, onClick } = useSidebarItem(props);

  return (
    <React.Fragment>
      <RenderComponent conditional={childMenu?.length > 0}>
        <RenderComponent conditional={miniSidebar && width >= RESPONSIVE_WIDTH}>
          <SidebarShortItem
            currentUserPermissions={currentUserPermissions}
            shop={shop}
            label={label}
            childMenu={childMenu}
            icon={icon}
            miniSidebar={miniSidebar && width >= RESPONSIVE_WIDTH}
          />
        </RenderComponent>
        <RenderComponent conditional={!Boolean(miniSidebar && width >= RESPONSIVE_WIDTH)}>
          <>
            <motion.div
              initial={false}
              className={cn(
                'group cursor-pointer rounded-md px-3 py-2.5 text-body-dark hover:bg-gray-100 focus:text-accent',
                isOpen ? 'bg-gray-100 font-medium' : '',
              )}
              onClick={onClick}
            >
              <div className={cn('flex w-full items-center text-sm')}>
                <span className="text-gray-600">{getIcon({ iconList: sidebarIcons, iconName: icon, className: 'w-5 h-5 me-3' })}</span>
                <span className={width >= RESPONSIVE_WIDTH && miniSidebar ? 'hidden' : ''}>{label}</span>

                <ChevronRight
                  className={cn(
                    'h-3.5 w-3.5 shrink-0 opacity-75 transition-transform duration-300 ltr:ml-auto ltr:mr-0 rtl:mr-auto rtl:ml-0',
                    isOpen ? 'rotate-90 transform' : '',
                    width >= RESPONSIVE_WIDTH && miniSidebar ? 'hidden' : '',
                  )}
                />
              </div>
            </motion.div>

            <AnimatePresence initial={false}>
              <RenderComponent conditional={isOpen}>
                <motion.div
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{ open: { opacity: 1, height: 'auto' }, collapsed: { opacity: 0, height: 0 } }}
                  transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                  className={miniSidebar ? 'relative' : 'mt-0!'}
                >
                  <div className="pt-2 ltr:pl-5 rtl:pr-5">
                    <div className="space-y-1 border-0 border-l border-dashed border-slate-300 ltr:pl-1 rtl:pr-1">
                      {childMenu?.map((item: any, index: number) => {
                        if (shop && !hasAccess(item?.permissions, currentUserPermissions)) return null;

                        const basePath = shop ? item?.href(shop.toString()) : item?.href;
                        const query = new URLSearchParams({ parents: label }).toString();

                        return (
                          <div key={index}>
                            <Link
                              href={`${basePath}?${query}`}
                              className={cn(
                                'relative flex w-full cursor-pointer items-center rounded-lg py-2 px-5 text-sm text-start before:absolute before:-left-0.5 before:top-4.5 before:h-px before:w-3 before:border-t before:border-dashed before:border-gray-300 before:content-[""] focus:text-accent',
                                (
                                  shop ? sanitizedPath === item?.href(shop?.toString()!) : sanitizedPath === item?.href
                                ) ?
                                  'bg-transparent font-medium text-accent-hover'
                                : 'text-body-dark hover:text-accent focus:text-accent',
                              )}
                              title={t(item.label)}
                              onClick={() => app.closeSidebar()}
                            >
                              <span>{t(item.label)}</span>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </RenderComponent>
            </AnimatePresence>
          </>
        </RenderComponent>
      </RenderComponent>
      <RenderComponent conditional={!childMenu?.length}>
        <Link
          href={href}
          className={cn(
            `group flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-gray-700 text-start focus:text-accent ${
              miniSidebar && width >= RESPONSIVE_WIDTH ? 'hover:text-accent-hover ltr:pl-3 rtl:pr-3' : 'hover:bg-gray-100'
            }`,
            sanitizedPath === href ? `font-medium text-accent-hover! ${!miniSidebar ? 'bg-accent/10 hover:bg-accent/10!' : ''}` : '',
          )}
          title={label}
          onClick={() => app.closeSidebar()}
        >
          <RenderComponent conditional={icon}>
            <span
              className={cn(
                'transition',
                sanitizedPath === href ? 'text-accent-hover' : 'text-gray-600 group-focus:text-accent',
                miniSidebar && width >= RESPONSIVE_WIDTH ? 'group-hover:text-accent' : null,
              )}
            >
              {getIcon({ iconList: sidebarIcons, iconName: icon, className: 'w-5 h-5' })}
            </span>
          </RenderComponent>
          <span className={cn(miniSidebar && width >= RESPONSIVE_WIDTH ? 'hidden' : '')}>{label}</span>
        </Link>
      </RenderComponent>
    </React.Fragment>
  );
}

interface SidebarShortItemProps {
  childMenu: any;
  shop: any;
  label: string;
  currentUserPermissions: any;
  icon: string;
  miniSidebar?: boolean;
}

function SidebarShortItem(props: SidebarShortItemProps) {
  const { t } = useTranslation();
  const [location] = useLocation();
  const app = useRootStore('app');
  const [dropdown, setDropdown] = useState(false);
  const { childMenu, shop, label, currentUserPermissions, icon, miniSidebar } = props;
  const sanitizedPath = location;

  return (
    <AdvancePopover
      onMouseEnter={() => setDropdown(true)}
      onMouseLeave={() => setDropdown(false)}
      content={() => (
        <>
          {childMenu?.map((item: any, index: number) => {
            if (shop && !hasAccess(item?.permissions, currentUserPermissions)) return null;
            const basePath = shop ? item?.href(shop.toString()) : item?.href;
            const query = new URLSearchParams({ parents: label }).toString();
            return (
              <div key={index}>
                <Link
                  href={`${basePath}?${query}`}
                  className={cn(
                    'relative flex w-full cursor-pointer items-center rounded-lg py-2 text-sm text-start focus:text-accent',
                    (
                      shop ? sanitizedPath === item?.href(shop?.toString()!) : sanitizedPath === item?.href
                    ) ?
                      'bg-transparent font-medium text-accent-hover'
                    : 'text-body-dark hover:text-accent focus:text-accent',
                  )}
                  title={t(item?.label)}
                  onClick={() => app.closeSidebar()}
                >
                  {t(item?.label)}
                </Link>
              </div>
            );
          })}
        </>
      )}
      isPopover={true}
      isOpen={dropdown}
      placement="left"
    >
      <div
        className={cn(
          'relative flex w-full cursor-pointer items-center px-3 py-2.5 text-sm text-gray-600 before:absolute before:-right-5 before:top-0 before:h-full before:w-5 before:content-[""]',
          miniSidebar ? 'hover:text-accent ltr:pl-3 rtl:pr-3' : null,
        )}
      >
        {getIcon({ iconList: sidebarIcons, iconName: icon, className: 'w-5 h-5' })}
      </div>
    </AdvancePopover>
  );
}
