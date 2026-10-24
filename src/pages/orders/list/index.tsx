import classNames from 'classnames';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/common/card';
import { PageHeading } from '@/components/common/page-heading';
import { RenderComponent } from '@/components/common/render-component';
import { Search } from '@/components/common/search';
import { DownloadIcon } from '@/components/icons/download-icon';
import { MoreIcon } from '@/components/icons/more-icon';
import { OrderList } from '@/components/order/order-list';
import { ErrorMessage } from '@/components/ui/error-message';
import { Loader } from '@/components/ui/loader/loader';
import { useRootStore } from '@/contexts/root';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

import { useOrdersPage } from './useOrdersPage';

export function OrdersPage() {
  const { t } = useTranslation();
  const order = useRootStore('order');

  const { handlePagination, handleSearch, store, handleExportOrder } = useOrdersPage();

  return (
    <React.Fragment>
      <Observer>
        {() => (
          <RenderComponent conditional={order.ordersQuery.isLoading}>
            <Loader text={t('text-loading')} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={order.ordersQuery.isError}>
            <ErrorMessage message={order.ordersQuery.error?.message} />
          </RenderComponent>
        )}
      </Observer>
      <Observer>
        {() => (
          <RenderComponent conditional={order.ordersQuery.isSuccess}>
            <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
              <div className="mb-4 md:mb-0 md:w-1/4">
                <PageHeading title={t('input-label-orders')} />
              </div>

              <div className="flex w-full flex-row items-center md:w-1/2">
                <Search
                  onSearch={handleSearch}
                  className="w-full"
                  placeholderText={t('input-placeholder-search-tracking-number')}
                />
                <Menu
                  as="div"
                  className="relative inline-block ltr:text-left rtl:text-right"
                >
                  <MenuButton className="group p-2">
                    <MoreIcon className="w-3.5 text-body" />
                  </MenuButton>
                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      as="ul"
                      className={classNames(
                        'shadow-700 absolute z-50 mt-2 w-52 overflow-hidden rounded border border-border-200 bg-light py-2 focus:outline-none ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left',
                      )}
                    >
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            onClick={handleExportOrder}
                            className={classNames(
                              'flex w-full items-center space-x-3 px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none rtl:space-x-reverse',
                              focus ? 'text-accent' : 'text-body',
                            )}
                          >
                            <DownloadIcon className="w-5 shrink-0" />
                            <span className="whitespace-nowrap">{t('common:text-export-orders')}</span>
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </Card>

            <OrderList
              orders={order.orders}
              paginatorInfo={order.paginatorInfo}
              onPagination={handlePagination}
              onOrder={(orderBy) => store.setParams({ orderBy })}
              onSort={(sortedBy) => store.setParams({ sortedBy })}
            />
          </RenderComponent>
        )}
      </Observer>
    </React.Fragment>
  );
}
