import cn from 'classnames';
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
import { useRenderCount } from '@/hooks/useRenderCount';
import { Category, Type } from '@/types';

import { useProductsPage } from './useProductsPage';

interface ProductTypeOptions {
  name: string;
  slug: string;
}

function RenderSuccess(props: { params: ReturnType<typeof useProductsPage> }) {
  useRenderCount('RenderSuccess');
  const { t } = useTranslation();
  const product = useRootStore('product');
  const { handlePagination, handleSearch, store } = props.params;

  return (
    <React.Fragment>
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="mb-4 md:mb-0 md:w-1/4">
            <PageHeading title={t('input-label-products')} />
          </div>

          <div className="flex w-full flex-col items-center ms-auto md:w-2/4">
            <Search
              onSearch={handleSearch}
              placeholderText={t('input-placeholder-search-name')}
            />
          </div>

          <Observer>
            {() => (
              <button
                className="mt-5 flex items-center whitespace-nowrap text-base font-semibold text-accent md:mt-0 md:ms-5"
                onClick={store.toggleVisible}
              >
                {t('text-filter')}
                <RenderComponent conditional={store.visible}>
                  <ArrowUp className="ms-2" />
                </RenderComponent>
                <RenderComponent conditional={!store.visible}>
                  <ArrowDown className="ms-2" />
                </RenderComponent>
              </button>
            )}
          </Observer>
        </div>

        <Observer>
          {() => (
            <div
              className={cn('flex w-full transition', {
                'visible h-auto': store.visible,
                'invisible h-0': !store.visible,
              })}
            >
              <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:flex-row md:items-center md:pt-8">
                <CategoryTypeFilter
                  enableType
                  enableCategory
                  enableProductType
                  className="w-full"
                  type={store.params.type}
                  onTypeFilter={(type: Type) => store.setParams({ page: 1, type: type.slug })}
                  onCategoryFilter={(category: Category) => store.setParams({ page: 1, categories: category.slug })}
                  onProductTypeFilter={(productType: ProductTypeOptions) => store.setParams({ page: 1, product_type: productType.slug })}
                />
              </div>
            </div>
          )}
        </Observer>
      </Card>
      <Observer>
        {() => (
          <ProductList
            sort={store.params.sortedBy}
            products={product.products}
            paginatorInfo={product.paginatorInfo}
            onPagination={handlePagination}
            onOrder={(orderBy) => store.setParams({ orderBy })}
            onSort={(sortedBy) => store.setParams({ sortedBy })}
          />
        )}
      </Observer>
    </React.Fragment>
  );
}

export function ProductsPage() {
  const { t } = useTranslation();
  const state = useProductsPage();
  const product = useRootStore('product');
  useRenderCount('ProductsPage');
  return (
    <React.Fragment>
      <Observer>
        {() => (
          <RenderComponent conditional={product.productsQuery.isLoading}>
            <Loader text={t('text-loading')} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={product.productsQuery.isError}>
            <ErrorMessage message={product.productsQuery.error?.message} />
          </RenderComponent>
        )}
      </Observer>
      <Observer>
        {() => (
          <RenderComponent conditional={product.productsQuery.isSuccess}>
            <RenderSuccess params={state} />
          </RenderComponent>
        )}
      </Observer>
    </React.Fragment>
  );
}
