import classNames from 'classnames';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Cart } from '@/components/cart/cart';
import { CartCounterButton } from '@/components/cart/cart-counter-button';
import { Card } from '@/components/common/card';
import { PageHeading } from '@/components/common/page-heading';
import { RenderComponent } from '@/components/common/render-component';
import { Search } from '@/components/common/search';
import { CategoryTypeFilter } from '@/components/filters/category-type-filter';
import { ArrowDown } from '@/components/icons/arrow-down';
import { ArrowUp } from '@/components/icons/arrow-up';
import { ProductCard } from '@/components/product/card';
import { Drawer } from '@/components/ui/drawer';
import { DrawerWrapper } from '@/components/ui/drawer-wrapper';
import { ErrorMessage } from '@/components/ui/error-message';
import { Loader } from '@/components/ui/loader/loader';
import { NotFound } from '@/components/ui/not-found';
import { Pagination } from '@/components/ui/pagination';
import { useRootStore } from '@/contexts/root';
import { Category, Product, Type } from '@/types';

import { useCreateOrderPage } from './useCreateOrderPage';

export function CreateOrderPage() {
  const { t } = useTranslation();
  const app = useRootStore('app');
  const product = useRootStore('product');
  const { store, handleSearch, toggleVisible, handlePagination } = useCreateOrderPage();

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
                  <PageHeading title={t('input-label-create-order')} />
                </div>

                <div className="flex w-full flex-col items-center ms-auto md:w-2/4">
                  <Search
                    onSearch={handleSearch}
                    placeholderText={t('input-placeholder-search-name')}
                  />
                </div>

                <button
                  className="mt-5 flex items-center whitespace-nowrap text-base font-semibold text-accent md:mt-0 md:ms-5"
                  onClick={toggleVisible}
                >
                  {t('text-filter')}{' '}
                  <Observer>
                    {() => (
                      <RenderComponent conditional={store.visible}>
                        <ArrowUp className="ms-2" />
                      </RenderComponent>
                    )}
                  </Observer>
                  <Observer>
                    {() => (
                      <RenderComponent conditional={!store.visible}>
                        <ArrowDown className="ms-2" />
                      </RenderComponent>
                    )}
                  </Observer>
                </button>
              </div>

              <Observer>
                {() => (
                  <div className={classNames('flex w-full transition', { 'visible h-auto': store.visible, 'invisible h-0': !store.visible })}>
                    <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:flex-row md:items-center md:pt-8">
                      <CategoryTypeFilter
                        enableType
                        enableCategory
                        className="w-full"
                        type={store.params.type}
                        onTypeFilter={(type: Type) => store.setParams({ page: 1, type: type.slug })}
                        onCategoryFilter={(category: Category) => store.setParams({ page: 1, categories: category.slug })}
                      />
                    </div>
                  </div>
                )}
              </Observer>
            </Card>

            {/* <Card> */}
            <div className="flex space-x-5">
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 3xl:grid-cols-6">
                {product.products.map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    item={product}
                  />
                ))}
              </div>
            </div>

            <RenderComponent conditional={!product.products?.length}>
              <NotFound
                text="text-not-found"
                className="mx-auto w-7/12"
              />
            </RenderComponent>

            <div className="mt-8 flex w-full justify-center">
              <RenderComponent conditional={!!product.paginatorInfo?.total}>
                <div className="flex items-center justify-end">
                  <Pagination
                    total={product.paginatorInfo?.total}
                    current={product.paginatorInfo?.currentPage}
                    pageSize={product.paginatorInfo?.perPage}
                    onChange={handlePagination}
                    showLessItems
                  />
                </div>
              </RenderComponent>
            </div>
            <div className="w-110 shrink-0 bg-white">
              <Cart />
            </div>

            <CartCounterButton />

            <Drawer
              open={app.displayCartSidebar}
              onClose={app.closeCartSidebar}
              variant="right"
            >
              <DrawerWrapper hideTopBar={true}>
                <Cart />
              </DrawerWrapper>
            </Drawer>
          </RenderComponent>
        )}
      </Observer>
    </React.Fragment>
  );
}
