import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/common/card';
import { PageHeading } from '@/components/common/page-heading';
import { RenderComponent } from '@/components/common/render-component';
import { Search } from '@/components/common/search';
import { StaffList } from '@/components/shop/staff-list';
import { ErrorMessage } from '@/components/ui/error-message';
import { Loader } from '@/components/ui/loader/loader';
import { useRootStore } from '@/contexts/root';

import { useVendorStaffsPage } from './useVendorStaffsPage';

export function VendorStaffsPage() {
  const { t } = useTranslation();
  const user = useRootStore('user');
  const { handlePagination, handleSearch, store } = useVendorStaffsPage();

  return (
    <React.Fragment>
      <Observer>
        {() => (
          <RenderComponent conditional={user.staffsQuery.isLoading}>
            <Loader text={t('text-loading')} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={user.staffsQuery.isError}>
            <ErrorMessage message={user.staffsQuery.error?.message} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={user.staffsQuery.isSuccess}>
            <Card className="mb-8 flex flex-col items-center md:flex-row">
              <div className="mb-4 md:mb-0 md:w-1/4">
                <PageHeading title={t('input-label-all-staffs')} />
              </div>

              <div className="flex w-full flex-col items-center space-y-4 ms-auto md:w-3/4 md:flex-row md:space-y-0 xl:w-2/4">
                <Search
                  onSearch={handleSearch}
                  placeholderText={t('input-placeholder-search-name')}
                />
              </div>
            </Card>

            <StaffList
              staffs={user.staffs}
              onPagination={handlePagination}
              paginatorInfo={user.staffsPaginatorInfo}
              onOrder={(orderBy) => store.setParams({ orderBy })}
              onSort={(sortedBy) => store.setParams({ sortedBy })}
            />
          </RenderComponent>
        )}
      </Observer>
    </React.Fragment>
  );
}
