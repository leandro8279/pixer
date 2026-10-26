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

import { useMyStaffsPage } from './useMyStaffsPage';

export function MyStaffsPage() {
  const { t } = useTranslation();
  const user = useRootStore('user');
  const { handlePagination, handleSearch, store } = useMyStaffsPage();

  return (
    <React.Fragment>
      <Observer>
        {() => (
          <RenderComponent conditional={user.userStaffsQuery.isLoading}>
            <Loader text={t('text-loading')} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={user.userStaffsQuery.isError}>
            <ErrorMessage message={user.userStaffsQuery.error?.message} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={user.userStaffsQuery.isSuccess}>
            <Card className="mb-8 flex flex-col items-center md:flex-row">
              <div className="mb-4 md:mb-0 md:w-1/4">
                <PageHeading title={t('input-label-my-staffs')} />
              </div>

              <div className="flex w-full items-center ms-auto md:w-2/4">
                <Search
                  onSearch={handleSearch}
                  placeholderText={t('input-placeholder-search-name')}
                />
              </div>
            </Card>

            <StaffList
              staffs={user.userStaffs}
              onPagination={handlePagination}
              paginatorInfo={user.userStaffsPaginatorInfo}
              onOrder={(orderBy) => store.setParams({ orderBy })}
              onSort={(sortedBy) => store.setParams({ sortedBy })}
            />
          </RenderComponent>
        )}
      </Observer>
    </React.Fragment>
  );
}
