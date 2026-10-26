import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/common/card';
import { PageHeading } from '@/components/common/page-heading';
import { RenderComponent } from '@/components/common/render-component';
import { ErrorMessage } from '@/components/ui/error-message';
import { Loader } from '@/components/ui/loader/loader';
import { UserAdminList } from '@/components/user/user-admin-list';
import { useRootStore } from '@/contexts/root';

import { useVendorsPendingPage } from './useVendorsPendingPage';

export function VendorsPendingPage() {
  const { t } = useTranslation();
  const user = useRootStore('user');
  const { handlePagination, store } = useVendorsPendingPage();
  return (
    <React.Fragment>
      <Observer>
        {() => (
          <RenderComponent conditional={user.vendorsQuery.isLoading}>
            <Loader text={t('text-loading')} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={user.vendorsQuery.isError}>
            <ErrorMessage message={user.vendorsQuery.error?.message} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={user.vendorsQuery.isSuccess}>
            <Card className="mb-8 flex flex-col items-center md:flex-row">
              <div className="w-full">
                <PageHeading title={t('text-vendors')} />
              </div>
            </Card>

            <UserAdminList
              admins={user.vendors}
              onPagination={handlePagination}
              paginatorInfo={user.vendorsPaginatorInfo}
              onOrder={(orderBy) => store.setParams({ orderBy })}
              onSort={(sortedBy) => store.setParams({ sortedBy })}
            />
          </RenderComponent>
        )}
      </Observer>
    </React.Fragment>
  );
}
