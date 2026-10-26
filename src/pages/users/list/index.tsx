import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/common/card';
import { PageHeading } from '@/components/common/page-heading';
import { RenderComponent } from '@/components/common/render-component';
import { Search } from '@/components/common/search';
import { ErrorMessage } from '@/components/ui/error-message';
import { LinkButton } from '@/components/ui/link-button';
import { Loader } from '@/components/ui/loader/loader';
import { UserList } from '@/components/user/user-list';
import { Routes } from '@/config/routes';
import { useRootStore } from '@/contexts/root';

import { useUsersPage } from './useUsersPage';

export function UsersPage() {
  const { t } = useTranslation();
  const user = useRootStore('user');
  const { handlePagination, handleSearch, store } = useUsersPage();

  return (
    <React.Fragment>
      <Observer>
        {() => (
          <RenderComponent conditional={user.usersQuery.isLoading}>
            <Loader text={t('text-loading')} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={user.usersQuery.isError}>
            <ErrorMessage message={user.usersQuery.error?.message} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={user.usersQuery.isSuccess}>
            <Card className="mb-8 flex flex-col items-center md:flex-row">
              <div className="mb-4 md:mb-0 md:w-1/4">
                <PageHeading title={t('input-label-users')} />
              </div>

              <div className="flex w-full flex-col items-center space-y-4 ms-auto md:w-3/4 md:flex-row md:space-y-0 xl:w-2/4">
                <Search
                  onSearch={handleSearch}
                  placeholderText={t('input-placeholder-search-name')}
                />

                <LinkButton
                  href={`${Routes.user.create}`}
                  className="h-12 w-full md:w-auto md:ms-6"
                >
                  <span>+ {t('button-label-add-user')}</span>
                </LinkButton>
              </div>
            </Card>

            <UserList
              customers={user.users}
              paginatorInfo={user.paginatorInfo}
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
