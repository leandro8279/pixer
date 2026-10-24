import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/common/card';
import { PageHeading } from '@/components/common/page-heading';
import { RenderComponent } from '@/components/common/render-component';
import { Search } from '@/components/common/search';
import { ShopList } from '@/components/shop/shop-list';
import { ErrorMessage } from '@/components/ui/error-message';
import { Loader } from '@/components/ui/loader/loader';
import { useRootStore } from '@/contexts/root';
import { useRenderCount } from '@/hooks/useRenderCount';

import { useShopsPage } from './useShopsPage';

export function ShopsPage() {
  const state = useShopsPage();
  useRenderCount('ShopsPage');
  const { t } = useTranslation();
  const shop = useRootStore('shop');
  const setting = useRootStore('setting');

  return (
    <React.Fragment>
      <Observer>
        {() => (
          <RenderComponent conditional={setting.settingsQuery.isLoading || shop.shopsQuery.isLoading}>
            <Loader text={t('text-loading')} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={!!shop.shopsQuery.error}>
            <ErrorMessage message={shop.shopsQuery.error?.message} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={!setting.settingsQuery.isLoading && !shop.shopsQuery.isLoading}>
            <React.Fragment>
              <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/4">
                  <PageHeading title={t('sidebar-nav-item-shops')} />
                </div>

                <div className="flex w-full flex-col items-center ms-auto md:w-1/2 md:flex-row">
                  <Search
                    onSearch={state.handleSearch}
                    placeholderText={t('input-placeholder-search-name')}
                  />
                </div>
              </Card>

              <ShopList
                shops={shop.shops}
                paginatorInfo={shop.paginatorInfo}
                onPagination={state.handlePagination}
                onSort={(sortedBy) => shop.setParams({ sortedBy })}
                onOrder={(orderBy) => shop.setParams({ orderBy })}
                isMultiCommissionRate={Boolean(setting.settings?.options?.isMultiCommissionRate)}
              />
            </React.Fragment>
          </RenderComponent>
        )}
      </Observer>
    </React.Fragment>
  );
}
