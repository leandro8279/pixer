import cn from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { observer, Observer } from 'mobx-react-lite';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

import { RenderComponent } from '@/components/common/render-component';
import { ShoppingBagIcon } from '@/components/icons/sellers';
import { Routes } from '@/config/routes';
import { useRootStore } from '@/contexts/root';
import { useRouter } from '@/hooks/useRouter';
import { adminOnly, getAuthCredentials, hasAccess } from '@/utils/auth-utils';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

import { useRecentOrderBar } from './useRecentOrderBar';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

const NotifyLogItem = observer(({ item }: any) => {
  const router = useRouter();
  const { t } = useTranslation();
  const order = useRootStore('order');
  const { permissions } = getAuthCredentials();

  const { notifyLogRead } = useRootStore('notify');

  useEffect(() => order.setId(item?.notify_tracker), []);

  const handleClickOnNotification = (value: any) => {
    notifyLogRead.mutate({ input: value });

    const shopURL = order.order?.shop?.slug;
    const redirectTo =
      permissions?.includes('super_admin') ? Routes?.order?.details(value?.notify_tracker) : shopURL + Routes?.order?.details(value?.notify_tracker);

    router.push('/' + redirectTo);
  };

  return (
    <React.Fragment>
      <div
        onClick={() => handleClickOnNotification(item)}
        className={cn(
          "relative flex gap-2 rounded-md py-3.5 px-6 text-sm font-semibold capitalize transition duration-200 before:absolute before:top-5 before:h-2 before:w-2 before:rounded-full before:bg-accent before:opacity-0 before:content-[''] before:inset-s-2 hover:text-accent group-hover:bg-gray-100/70",
          item?.is_read == false ? 'before:opacity-100' : null,
        )}
      >
        <div className="overflow-hidden">
          <h3 className={cn('truncate text-sm font-medium', item?.is_read ? 'text-[#666]' : '')}>
            {t('text-order')}: <span className="inline-block font-bold hover:text-accent">#{item?.notify_tracker}</span> {t('text-is-created')}.
          </h3>
          <span className="mt-2 block text-xs font-medium text-[#666666]">
            {dayjs(item?.created_at).format('MMM DD, YYYY')} at {dayjs(item?.created_at).format('hh:mm A')}
          </span>
        </div>
      </div>
    </React.Fragment>
  );
});

export function RecentOrderBar() {
  const { t } = useTranslation();
  const auth = useRootStore('auth');
  const notify = useRootStore('notify');
  const { permissions } = getAuthCredentials();
  const { store, markAllAsRead } = useRecentOrderBar();
  const permission = hasAccess(adminOnly, permissions);

  return (
    <Menu
      as="div"
      className="inline-block text-left sm:relative"
    >
      <Observer>
        {() => (
          <MenuButton
            className={cn(
              'relative flex h-9 w-9 items-center justify-center gap-2 rounded-full border border-gray-200 bg-gray-50 text-gray-600 before:absolute before:top-0 before:right-0 before:h-2 before:w-2 before:rounded-full focus:outline-none data-[headlessui-state=open]:bg-white data-[headlessui-state=open]:text-accent',
              notify.activeStatus.length > 0 ? 'before:bg-[#3080F8]' : '',
            )}
          >
            <ShoppingBagIcon
              className="h-5 w-5"
              onClick={() => store.setOrderOpen(!store.orderOpen)}
            />
          </MenuButton>
        )}
      </Observer>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          as="div"
          className="absolute top-16 z-30 w-80 rounded-lg border border-gray-200 bg-white shadow-box inset-e-2 origin-top-end focus:outline-none sm:top-12 sm:mt-0.5 sm:inset-e-0 lg:top-14 lg:mt-0"
        >
          <MenuItem>
            <>
              <div className="flex items-center justify-between rounded-tl-lg rounded-tr-lg border-b border-gray-200/80 px-6 py-4 font-medium">
                <span>{t('text-orders')}</span>
                <Observer>
                  {() => (
                    <RenderComponent conditional={notify.activeStatus.length > 0}>
                      <span
                        className="block cursor-pointer text-sm font-medium text-accent hover:text-heading"
                        onClick={markAllAsRead}
                      >
                        {t('text-mark-all-read')}
                      </span>
                    </RenderComponent>
                  )}
                </Observer>
              </div>
              <div>
                <Observer>
                  {() => (
                    <RenderComponent conditional={notify.notifyLogs?.length > 0}>
                      {notify.notifyLogs.map((item: any) => (
                        <div
                          className="group cursor-pointer border-b border-dashed border-gray-200 last:border-b-0"
                          key={item?.id}
                        >
                          <NotifyLogItem item={item} />
                        </div>
                      ))}
                    </RenderComponent>
                  )}
                </Observer>

                <Observer>
                  {() => (
                    <RenderComponent conditional={notify.notifyLogs.length === 0}>
                      <p className="mb-2 pt-5 pb-4 text-center text-sm font-medium text-gray-500">{t('no-order-found')}</p>
                    </RenderComponent>
                  )}
                </Observer>
              </div>
              <Observer>
                {() => (
                  <Link
                    href={permission ? Routes.notifyLogs?.list : `${Routes.ownerDashboardNotifyLogs}/user/${auth.me.id}`}
                    className="block border-t border-gray-200/80 p-3 text-center text-sm font-medium text-accent hover:text-accent-hover"
                  >
                    {t('text-see-all-notification')}
                  </Link>
                )}
              </Observer>
            </>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
