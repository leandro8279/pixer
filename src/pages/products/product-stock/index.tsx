import classNames from 'classnames';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/common/card';
import { PageHeading } from '@/components/common/page-heading';
import { RenderComponent } from '@/components/common/render-component';
import { Search } from '@/components/common/search';
import { CategoryTypeFilter } from '@/components/filters/category-type-filter';
import { ArrowDown } from '@/components/icons/arrow-down';
import { ArrowUp } from '@/components/icons/arrow-up';
import { ProductList } from '@/components/product/product-list';
import { ErrorMessage } from '@/components/ui/error-message';
import { Loader } from '@/components/ui/loader/loader';
import { useRootStore } from '@/contexts/root';

import { useProductStockPage } from './useProductStockPage';

export function ProductStockPage() {
  const { t } = useTranslation();
  const product = useRootStore('product');
  const { handlePagination, handleSearch, store, toggleVisible } = useProductStockPage();
  return (
    <React.Fragment>
      <Observer>
        {() => (
          <RenderComponent conditional={product.lowOrOutOfStockQuery.isLoading}>
            <Loader text={t('text-loading')} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={product.lowOrOutOfStockQuery.isError}>
            <ErrorMessage message={product.lowOrOutOfStockQuery.error?.message} />
          </RenderComponent>
        )}
      </Observer>
      <Observer>
        {() => (
          <RenderComponent conditional={product.lowOrOutOfStockQuery.isSuccess}>
            <Card className="mb-8 flex flex-col">
              <div className="flex w-full flex-col items-center md:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/4">
                  <PageHeading title={t('form:input-label-products')} />
                </div>

                <div className="flex w-full flex-col items-center ms-auto md:w-2/4">
                  <Search onSearch={handleSearch} />
                </div>

                <button
                  className="mt-5 flex items-center whitespace-nowrap text-base font-semibold text-accent md:mt-0 md:ms-5"
                  onClick={toggleVisible}
                >
                  {t('text-filter')}{' '}
                  <RenderComponent conditional={store.visible}>
                    <ArrowUp className="ms-2" />
                  </RenderComponent>
                  <RenderComponent conditional={!store.visible}>
                    <ArrowDown className="ms-2" />
                  </RenderComponent>
                </button>
              </div>

              <div className={classNames('flex w-full transition', { 'visible h-auto': store.visible, 'invisible h-0': !store.visible })}>
                <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:flex-row md:items-center md:pt-8">
                  <CategoryTypeFilter
                    className="w-full"
                    onTypeFilter={({ slug }: { slug: string }) => store.setParams({ page: 1, type: slug })}
                    onCategoryFilter={({ slug }: { slug: string }) => store.setParams({ page: 1, categories: slug })}
                    enableCategory
                    enableType
                  />
                </div>
              </div>
            </Card>
            <ProductList
              sort={store.params.sortedBy}
              onPagination={handlePagination}
              products={product.lowOrOutOfStockProducts}
              onOrder={(orderBy) => store.setParams({ orderBy })}
              paginatorInfo={product.lowOrOutOfStockPaginatorInfo}
              onSort={(sortedBy) => store.setParams({ sortedBy })}
            />
          </RenderComponent>
        )}
      </Observer>
    </React.Fragment>
  );
}
