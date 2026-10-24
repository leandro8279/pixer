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
import { ProductInventoryList } from '@/components/product/product-inventory-list';
import { ErrorMessage } from '@/components/ui/error-message';
import { Loader } from '@/components/ui/loader/loader';
import { useRootStore } from '@/contexts/root';
import { Category, ProductTypeOptions, Type } from '@/types';

import { useInventoryPage } from './useInventoryPage';

export function InventoryPage() {
  const { t } = useTranslation();
  const product = useRootStore('product');
  const { handleSearch, handlePagination, store } = useInventoryPage();

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
            <Card className="mb-8 flex flex-col">
              <div className="flex w-full flex-col items-center md:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/4">
                  <PageHeading title={t('input-label-inventory')} />
                </div>

                <div className="flex w-full flex-col items-center ms-auto md:w-2/4">
                  <Search onSearch={handleSearch} />
                </div>

                <button
                  className="mt-5 flex items-center whitespace-nowrap text-base font-semibold text-accent md:mt-0 md:ms-5"
                  onClick={store.toggleVisible}
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
                    type={store.params.type}
                    onCategoryFilter={(category: Category) => store.setParams({ page: 1, categories: category.slug })}
                    onTypeFilter={(type: Type) => store.setParams({ page: 1, type: type.slug })}
                    onProductTypeFilter={(productType: ProductTypeOptions) => store.setParams({ page: 1, product_type: productType.slug })}
                    enableCategory
                    enableType
                    enableProductType
                  />
                </div>
              </div>
            </Card>
            <ProductInventoryList
              products={product.products}
              onPagination={handlePagination}
              paginatorInfo={product.paginatorInfo}
              onOrder={(orderBy) => store.setParams({ orderBy })}
              onSort={(sortedBy) => store.setParams({ sortedBy })}
            />
          </RenderComponent>
        )}
      </Observer>
    </React.Fragment>
  );
}
