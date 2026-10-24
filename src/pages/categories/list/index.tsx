import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { CategoryList } from '@/components/category/category-list';
import { Card } from '@/components/common/card';
import { PageHeading } from '@/components/common/page-heading';
import { RenderComponent } from '@/components/common/render-component';
import { Search } from '@/components/common/search';
import { ErrorMessage } from '@/components/ui/error-message';
import { LinkButton } from '@/components/ui/link-button';
import { Loader } from '@/components/ui/loader/loader';
import { Routes } from '@/config/routes';
import { useRootStore } from '@/contexts/root';

import { useCategoriesPage } from './useCategoriesPage';

export function CategoriesPage() {
  const { t } = useTranslation();
  const category = useRootStore('category');
  const { handlePagination, handleSearch, store } = useCategoriesPage();

  return (
    <React.Fragment>
      <Observer>
        {() => (
          <RenderComponent conditional={category.categoriesQuery.isLoading}>
            <Loader text={t('text-loading')} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={category.categoriesQuery.isError}>
            <ErrorMessage message={category.categoriesQuery.error?.message} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={category.categoriesQuery.isSuccess}>
            <Card className="mb-8 flex flex-col">
              <div className="flex w-full flex-col items-center md:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/4">
                  <PageHeading title={t('input-label-categories')} />
                </div>

                <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-3/4">
                  <Search
                    onSearch={handleSearch}
                    placeholderText={t('input-placeholder-search-name')}
                  />

                  <LinkButton
                    href={`${Routes.category.create}`}
                    className="h-12 w-full md:w-auto md:ms-6"
                  >
                    <span className="block md:hidden xl:block">+ {t('button-label-add-categories')}</span>
                    <span className="hidden md:block xl:hidden">+ {t('button-label-add')}</span>
                  </LinkButton>
                </div>
              </div>
            </Card>
            <CategoryList
              categories={category.categories}
              paginatorInfo={category.paginatorInfo}
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
