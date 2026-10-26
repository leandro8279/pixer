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

import { useAdminsPage } from './useAdminsPage';

export function AdminsPage() {
  const { t } = useTranslation();
  const user = useRootStore('user');
  const { handlePagination, store } = useAdminsPage();

  return (
    <React.Fragment>
      <Observer>
        {() => (
          <RenderComponent conditional={user.adminUsersQuery.isLoading}>
            <Loader text={t('text-loading')} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={user.adminUsersQuery.isError}>
            <ErrorMessage message={user.adminUsersQuery.error?.message} />
          </RenderComponent>
        )}
      </Observer>
      <Observer>
        {() => (
          <RenderComponent conditional={user.adminUsersQuery.isSuccess}>
            <Card className="mb-8 flex items-center">
              <div className="md:w-1/4">
                <PageHeading title={t('text-admins')} />
              </div>
            </Card>

            <UserAdminList
              admins={user.adminUsers}
              onPagination={handlePagination}
              paginatorInfo={user.adminUsersPaginatorInfo}
              onOrder={(orderBy) => store.setParams({ orderBy })}
              onSort={(sortedBy) => store.setParams({ sortedBy })}
            />
          </RenderComponent>
        )}
      </Observer>
    </React.Fragment>
  );
}
