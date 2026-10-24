import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TypeFilter } from '@/components/category/type-filter';
import { Card } from '@/components/common/card';
import { PageHeading } from '@/components/common/page-heading';
import { RenderComponent } from '@/components/common/render-component';
import { Search } from '@/components/common/search';
import { TagList } from '@/components/tag/tag-list';
import { ErrorMessage } from '@/components/ui/error-message';
import { LinkButton } from '@/components/ui/link-button';
import { Loader } from '@/components/ui/loader/loader';
import { Routes } from '@/config/routes';
import { useRootStore } from '@/contexts/root';
import { Type } from '@/types';

import { useTagsPage } from './useTagsPage';

export function TagsPage() {
  const { t } = useTranslation();
  const tag = useRootStore('tag');
  const { handlePagination, handleSearch, store } = useTagsPage();

  return (
    <React.Fragment>
      <Observer>
        {() => (
          <RenderComponent conditional={tag.tagsQuery.isLoading}>
            <Loader text={t('text-loading')} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={tag.tagsQuery.isError}>
            <ErrorMessage message={tag.tagsQuery.error?.message} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={tag.tagsQuery.isSuccess}>
            <Card className="mb-8 flex flex-col items-center md:flex-row">
              <div className="mb-4 md:mb-0 md:w-1/4">
                <PageHeading title={t('sidebar-nav-item-tags')} />
              </div>

              <div className="flex w-full flex-col items-center space-y-4 ms-auto md:w-1/1 md:flex-row md:space-y-0">
                <Search
                  onSearch={handleSearch}
                  placeholderText={t('input-placeholder-search-name')}
                />

                <TypeFilter
                  className="md:ms-6"
                  onTypeFilter={(type: Type) => store.setParams({ page: 1, type: type.slug })}
                />

                <LinkButton
                  href={`${Routes.tag.create}`}
                  className="h-12 w-full md:w-auto md:ms-6"
                >
                  <span className="block md:hidden xl:block">+ {t('button-label-add-tag')}</span>
                  <span className="hidden md:block xl:hidden">+ {t('button-label-add')}</span>
                </LinkButton>
              </div>
            </Card>

            <TagList
              tags={tag.tags}
              onPagination={handlePagination}
              onOrder={(orderBy) => store.setParams({ orderBy })}
              onSort={(sortedBy) => store.setParams({ sortedBy })}
              paginatorInfo={tag.paginatorInfo}
            />
          </RenderComponent>
        )}
      </Observer>
    </React.Fragment>
  );
}
