import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { Avatar } from '@/components/common/avatar';
import RenderComponent from '@/components/common/render-component';
import * as sidebarIcons from '@/components/icons/sidebar';

import { useRootStore } from '@/contexts/root-context';

import { siteSettings } from '@/settings/site.settings';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

import { getAuthCredentials } from '@/utils/auth-utils';
import { getIcon } from '@/utils/get-icon';
import { cn } from '@/utils/util';

import { Observer } from 'mobx-react-lite';
import { Link } from 'wouter';

export function AuthorizedMenu() {
  const { auth } = useRootStore();
  const { t } = useTranslation('common');
  const { role } = getAuthCredentials();

  return (
    <Menu
      as='div'
      className='relative inline-block shrink-0 grow-0 basis-auto py-2 text-left ps-1.5 sm:border-solid sm:border-gray-200 sm:py-3 sm:ps-6 sm:border-s lg:py-4 xl:py-2'
    >
      <MenuButton className='flex max-w-37.5 items-center gap-2 focus:outline-none lg:py-0.5 xl:py-2.5'>
        <Observer>
          {() => (
            <Avatar
              rounded='full'
              name='avatar'
              className='shrink-0 grow-0 basis-auto drop-shadow'
              src={auth.me.profile?.avatar?.thumbnail ?? siteSettings.avatar.placeholder}
            />
          )}
        </Observer>

        <Observer>
          {() => (
            <div className='hidden w-[calc(100%-48px)] flex-col items-start space-y-0.5 truncate text-sm ltr:text-left rtl:text-right xl:flex'>
              <span className='w-full truncate font-semibold capitalize text-black'>{auth.me.name}</span>
              <span className='w-full truncate text-xs capitalize text-gray-400'>
                {role ? role.split('_').join(' ') : auth.me.email}
              </span>
            </div>
          )}
        </Observer>
      </MenuButton>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <MenuItems
          as='ul'
          className='authorized-menu absolute mt-3 w-56 rounded-lg border border-gray-200 bg-white shadow-box end-0 origin-top-end focus:outline-none lg:mt-4 xl:mt-2'
        >
          <MenuItem>
            <li className='border-b border-dashed border-gray-200 p-2 focus:outline-none'>
              <div className='flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2'>
                <Observer>
                  {() => (
                    <Avatar
                      src={auth.me.profile?.avatar?.thumbnail ?? siteSettings?.avatar?.placeholder}
                      name='avatar'
                      className='shrink-0 grow-0 basis-auto drop-shadow'
                    />
                  )}
                </Observer>
                <Observer>
                  {() => (
                    <div className='flex w-[calc(100%-40px)] flex-col items-start space-y-0.5 text-sm'>
                      <span className='w-full truncate font-semibold capitalize text-black'>{auth.me.name}</span>
                      <span className='break-all text-xs text-gray-400'>{auth.me.email}</span>
                    </div>
                  )}
                </Observer>
              </div>
            </li>
          </MenuItem>
          <div className='space-y-0.5 py-2'>
            {siteSettings.authorizedLinks.map(({ href, labelTransKey, icon, permission }, index) => {
              const hasPermission = permission?.includes(role!);
              return (
                <Fragment key={index}>
                  <RenderComponent conditional={hasPermission}>
                    <MenuItem key={`${href}${labelTransKey}`}>
                      {({ focus }) => (
                        <li
                          className={cn(
                            'cursor-pointer border-dashed border-gray-200 px-2 last:mt-2.5! last:border-t last:pt-2',
                          )}
                        >
                          <Link
                            href={href}
                            className={cn(
                              'group flex items-center gap-2 rounded-md py-2.5 px-3 text-sm capitalize transition duration-200 hover:text-accent',
                              focus ? 'border-transparent bg-gray-100 text-accent' : 'text-heading',
                            )}
                          >
                            <span className='text-gray-600 group-hover:text-accent'>
                              {getIcon({ iconList: sidebarIcons, iconName: icon, className: 'w-5 h-5' })}
                            </span>
                            {t(labelTransKey)}
                          </Link>
                        </li>
                      )}
                    </MenuItem>
                  </RenderComponent>
                </Fragment>
              );
            })}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
