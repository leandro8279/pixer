import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/common/card';
import { PageHeading } from '@/components/common/page-heading';
import { RenderComponent } from '@/components/common/render-component';
import { Search } from '@/components/common/search';
import { GroupList } from '@/components/group/group-list';
import { ErrorMessage } from '@/components/ui/error-message';
import { LinkButton } from '@/components/ui/link-button';
import { Loader } from '@/components/ui/loader/loader';
import { Routes } from '@/config/routes';
import { useRootStore } from '@/contexts/root';

import { useGroupsPage } from './GroupsPage';

export function GroupsPage() {
  const { t } = useTranslation();
  const type = useRootStore('type');
  const { handleSearch, store } = useGroupsPage();

  return (
    <React.Fragment>
      <Observer>
        {() => (
          <RenderComponent conditional={type.typesQuery.isLoading}>
            <Loader text={t('text-loading')} />
          </RenderComponent>
        )}
      </Observer>
      <Observer>
        {() => (
          <RenderComponent conditional={type.typesQuery.isError}>
            <ErrorMessage message={type.typesQuery.error?.message} />
          </RenderComponent>
        )}
      </Observer>
      <Observer>
        {() => (
          <RenderComponent conditional={type.typesQuery.isSuccess}>
            <Card className="mb-8 flex flex-col items-center md:flex-row">
              <div className="mb-4 md:mb-0 md:w-1/4">
                <PageHeading title={t('sidebar-nav-item-groups')} />
              </div>

              <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-1/2">
                <Search
                  onSearch={handleSearch}
                  placeholderText={t('input-placeholder-search-name')}
                />

                <LinkButton
                  href={Routes.type.create}
                  className="h-12 w-full md:w-auto md:ms-6"
                >
                  <span className="block md:hidden xl:block">+ {t('button-label-add-group')}</span>
                  <span className="hidden md:block xl:hidden">+ {t('button-label-add')}</span>
                </LinkButton>
              </div>
            </Card>
            <GroupList
              types={type.types}
              onOrder={(orderBy) => store.setParams({ orderBy })}
              onSort={(sortedBy) => store.setParams({ sortedBy })}
            />
          </RenderComponent>
        )}
      </Observer>
    </React.Fragment>
  );
}
