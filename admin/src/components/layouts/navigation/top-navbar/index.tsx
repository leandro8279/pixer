import React from 'react';
import { useTranslation } from 'react-i18next';

import RenderComponent from '@/components/common/render-component';
import { SearchIcon } from '@/components/icons/search-icon';
import Alert from '@/components/ui/alert';
import { CountdownTimer } from '@/components/ui/countdown-timer';
import Loader from '@/components/ui/loader/loader';
import Logo from '@/components/ui/logo';

import { useRootStore } from '@/contexts/root-context';

import { RESPONSIVE_WIDTH } from '@/utils/constants';
import { useWindowSize } from '@/utils/use-window-size';
import { cn } from '@/utils/util';

import { motion } from 'framer-motion';

import { AuthorizedMenu } from '../authorized-menu';
import { SearchBar } from '../search-bar';
import { useNavbar } from './useNavbar';

export function Navbar() {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const { app, setting, shop } = useRootStore();
  const { handleClick, toggleSidebar } = useNavbar();

  return (
    <React.Fragment>
      <RenderComponent conditional={false}>
        <Loader showText={false} />
      </RenderComponent>

      <RenderComponent conditional={true}>
        <header className='fixed top-0 z-40 w-full bg-white shadow'>
          <RenderComponent conditional={width >= RESPONSIVE_WIDTH && app.isMaintenanceMode}>
            <Alert
              message={
                (setting.settings?.options?.isUnderMaintenance && `Site ${t('text-maintenance-mode-title')}`) ||
                (shop.shop?.settings?.isShopUnderMaintenance &&
                  `${shop.shop?.name} ${t('text-maintenance-mode-title')}`)
              }
              variant='info'
              className='sticky top-0 left-0 z-50'
              childClassName='flex justify-center items-center w-full gap-4 font-bold'
            >
              <CountdownTimer
                date={
                  (setting.settings?.options?.isUnderMaintenance &&
                    new Date(setting.settings.options?.maintenance?.start)) ||
                  (shop.shop?.settings?.isShopUnderMaintenance &&
                    new Date(shop.shop?.settings?.shopMaintenance?.start as Date))
                }
                className='text-blue-600 [&>p]:bg-blue-200 [&>p]:p-2 [&>p]:text-xs [&>p]:text-blue-600'
              />
            </Alert>
          </RenderComponent>

          <RenderComponent conditional={width >= RESPONSIVE_WIDTH && app.isMaintenanceModeStart}>
            <Alert
              message={t('text-maintenance-mode-start-title')}
              className='py-5.5'
              childClassName='text-center w-full font-bold'
            />
          </RenderComponent>

          <nav className='flex items-center px-5 md:px-8'>
            <div className='relative flex w-full flex-1 items-center'>
              <div className='flex items-center'>
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={toggleSidebar}
                  className='group flex h-5 w-5 shrink-0 cursor-pointer flex-col justify-center space-y-1 me-4 focus:text-accent focus:outline-none lg:hidden'
                >
                  <span
                    className={cn(
                      'h-0.5 rounded-full bg-gray-600 transition-[width] group-hover:bg-accent',
                      app.miniSidebar ? 'w-full' : 'w-2/4',
                    )}
                  />
                  <span className='h-0.5 w-full rounded-full bg-gray-600 group-hover:bg-accent' />
                  <span className='h-0.5 w-3/4 rounded-full bg-gray-600 transition-[width] group-hover:bg-accent' />
                </motion.button>
                <div
                  className={cn(
                    'flex h-16 shrink-0 transition-[width] duration-300 me-4 lg:h-19 lg:border-solid lg:border-gray-200/80 lg:me-8 lg:border-e',
                    app.miniSidebar ? 'lg:w-16.25' : 'lg:w-64.25',
                  )}
                >
                  <Logo />
                </div>
                <button
                  className='group hidden h-5 w-5 shrink-0 cursor-pointer flex-col justify-center space-y-1 me-6 lg:flex'
                  onClick={() => app.setMiniSidebar(!app.miniSidebar)}
                >
                  <span
                    className={cn(
                      'h-0.5 rounded-full bg-gray-600 transition-[width] group-hover:bg-accent',
                      app.miniSidebar ? 'w-full' : 'w-2/4',
                    )}
                  />
                  <span className='h-0.5 w-full rounded-full bg-gray-600 group-hover:bg-accent' />
                  <span
                    className={cn(
                      'h-0.5 rounded-full bg-gray-600 transition-[width] group-hover:bg-accent',
                      app.miniSidebar ? 'w-full' : 'w-3/4',
                    )}
                  />
                </button>
              </div>
              <div
                className='relative ml-auto mr-1.5 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-gray-50 py-4 text-gray-600 hover:border-transparent hover:bg-white hover:text-accent sm:mr-6 lg:hidden xl:hidden'
                onClick={handleClick}
              >
                <SearchIcon className='h-4 w-4' />
              </div>
              <div className='relative hidden w-full max-w-177.5 py-4 me-6 lg:block 2xl:me-auto'>
                <SearchBar />
              </div>

              {/* <div className='flex shrink-0 grow-0 basis-auto items-center'>
                {hasAccess(adminAndOwnerOnly, permissions) && (
                  <>
                    <div className='hidden border-gray-200/80 px-6 py-5 border-e 2xl:block'>
                      <LinkButton href={Routes.shop.create} size='small' className='px-3.5'>
                        {t('common:text-create-shop')}
                      </LinkButton>
                    </div>

                    <div className='hidden px-6 py-5 2xl:block'>
                      <VisitStore />
                    </div>

                    {options?.pushNotification?.all?.order ||
                    options?.pushNotification?.all?.message ||
                    options?.pushNotification?.all?.storeNotice ? (
                      <div className='flex items-center gap-3 px-0.5 py-3 sm:relative sm:border-gray-200/80 sm:py-3.5 sm:px-6 sm:border-s lg:py-5'>
                        {options?.pushNotification?.all?.order ? <RecentOrderBar user={data} /> : ''}

                        {options?.pushNotification?.all?.message ? <MessageBar user={data} /> : ''}

                        {!hasAccess(adminOnly, permissions) ? (
                          options?.pushNotification?.all?.storeNotice ? (
                            <StoreNoticeBar user={data} />
                          ) : (
                            ''
                          )
                        ) : null}
                      </div>
                    ) : null}
                  </>
                )}
              </div> */}

              {/* {enableMultiLang ? <LanguageSwitcher /> : null} */}

              <AuthorizedMenu />
            </div>
          </nav>
        </header>
      </RenderComponent>
    </React.Fragment>
  );
}
