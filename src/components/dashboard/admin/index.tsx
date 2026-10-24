import cn from 'classnames';
import { motion } from 'framer-motion';
import { Observer, observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { RenderComponent } from '@/components/common/render-component';
import { Search } from '@/components/common/search';
import { OrderStatusWidget } from '@/components/dashboard/widgets/box/widget-order-by-status';
import { TopRatedProductWidget } from '@/components/dashboard/widgets/box/widget-top-rate-product';
import { ProductCountByCategory } from '@/components/dashboard/widgets/table/widget-product-count-by-category';
import { BasketIcon } from '@/components/icons/summary/basket';
import { ChecklistIcon } from '@/components/icons/summary/checklist';
import { EaringIcon } from '@/components/icons/summary/earning';
import { ShoppingIcon } from '@/components/icons/summary/shopping';
import { RecentOrders } from '@/components/order/recent-orders';
import { PopularProductList } from '@/components/product/popular-product-list';
import { LowStockProduct } from '@/components/product/product-stock';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/error-message';
import { Loader } from '@/components/ui/loader/loader';
import { ColumnChart } from '@/components/widgets/column-chart';
import { StickerCard } from '@/components/widgets/sticker-card';
import { WithdrawTable } from '@/components/withdraw/withdraw-table';
import { useRootStore } from '@/contexts/root';
import { usePrice } from '@/hooks/usePrice';
import { useRenderCount } from '@/hooks/useRenderCount';

import { useAdminDashboard } from './useAdminDashboard';

const StickersCard = observer(() => {
  useRenderCount('StickersCard');
  const { analytics } = useRootStore('analytic');

  const { price: total_revenue } = usePrice(analytics && { amount: analytics?.totalRevenue });

  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StickerCard
        titleTransKey="sticker-card-title-rev"
        subtitleTransKey="sticker-card-subtitle-rev"
        icon={<EaringIcon className="h-8 w-8" />}
        color="#1EAE98"
        price={total_revenue}
      />
      <StickerCard
        titleTransKey="sticker-card-title-order"
        subtitleTransKey="sticker-card-subtitle-order"
        icon={<ShoppingIcon className="h-8 w-8" />}
        color="#865DFF"
        price={analytics?.totalOrders}
      />
      <StickerCard
        titleTransKey="sticker-card-title-vendor"
        icon={<ChecklistIcon className="h-8 w-8" />}
        color="#D74EFF"
        price={analytics?.totalVendors}
      />
      <StickerCard
        titleTransKey="sticker-card-title-total-shops"
        icon={<BasketIcon className="h-8 w-8" />}
        color="#E157A0"
        price={analytics?.totalShops}
      />
    </div>
  );
});

function RenderSuccess({ state }: { state: ReturnType<typeof useAdminDashboard> }) {
  useRenderCount('RenderSuccess');
  const { t } = useTranslation();
  const order = useRootStore('order');
  const product = useRootStore('product');
  const withdraw = useRootStore('withdraw');

  return (
    <div className="grid gap-7 md:gap-8 lg:grid-cols-2 2xl:grid-cols-12">
      <div className="col-span-full rounded-lg bg-light p-6 md:p-7">
        <div className="mb-5 flex items-center justify-between md:mb-7">
          <h3 className="before:content-'' relative mt-1 bg-light text-lg font-semibold text-heading before:absolute before:-top-px before:h-7 before:w-1 before:rounded-tr-md before:rounded-br-md before:bg-accent ltr:before:-left-6 rtl:before:-right-6 md:before:-top-0.5 md:ltr:before:-left-7 md:rtl:before:-right-7 lg:before:h-8">
            {t('text-summary')}
          </h3>
        </div>
        <StickersCard />
      </div>

      <div className="col-span-full rounded-lg bg-light p-6 md:p-7">
        <div className="mb-5 items-center justify-between sm:flex md:mb-7">
          <h3 className="before:content-'' relative mt-1 bg-light text-lg font-semibold text-heading before:absolute before:-top-px before:h-7 before:w-1 before:rounded-tr-md before:rounded-br-md before:bg-accent ltr:before:-left-6 rtl:before:-right-6 md:before:-top-0.5 md:ltr:before:-left-7 md:rtl:before:-right-7 lg:before:h-8">
            {t('text-order-status')}
          </h3>
          <div className="mt-3.5 inline-flex rounded-full bg-gray-100/80 p-1.5 sm:mt-0">
            <Observer>
              {() => (
                <RenderComponent conditional={state.timeFrame}>
                  {state.timeFrame.map((time) => (
                    <Observer key={time.day}>
                      {() => (
                        <div className="relative">
                          <Button
                            className={cn(
                              '!focus:ring-0  relative z-10 h-7! rounded-full px-2.5! text-sm font-medium text-gray-500',
                              time.day === state.store.activeTimeFrame ? 'text-accent' : '',
                            )}
                            type="button"
                            onClick={() => state.store.setActiveTimeFrame(time.day)}
                            variant="custom"
                          >
                            {time.name}
                          </Button>
                          <RenderComponent conditional={time.day === state.store.activeTimeFrame}>
                            <motion.div className="absolute bottom-0 left-0 right-0 z-0 h-full rounded-3xl bg-accent/10" />
                          </RenderComponent>
                        </div>
                      )}
                    </Observer>
                  ))}
                </RenderComponent>
              )}
            </Observer>
          </div>
        </div>

        <Observer>
          {() => (
            <OrderStatusWidget
              order={state.store.orderDataRange}
              timeFrame={state.store.activeTimeFrame}
              allowedStatus={['pending', 'processing', 'complete', 'cancel']}
            />
          )}
        </Observer>
      </div>

      <Observer>
        {() => (
          <RecentOrders
            className="col-span-full"
            orders={order.orders}
            onPagination={state.handlePagination}
            title={t('recent-order-table-title')}
            paginatorInfo={order.paginatorInfo}
            searchElement={
              <Search
                onSearch={state.handleSearch}
                placeholderText={t('form:input-placeholder-search-name')}
                className="hidden max-w-sm sm:inline-block [&button]:top-0.5"
                inputClassName="!h-10"
              />
            }
          />
        )}
      </Observer>

      <div className="lg:col-span-full 2xl:col-span-8">
        <Observer>
          {() => (
            <ColumnChart
              widgetTitle={t('sale-history')}
              colors={['#6073D4']}
              series={state.store.salesByYear}
              categories={[
                t('january'),
                t('february'),
                t('march'),
                t('april'),
                t('may'),
                t('june'),
                t('july'),
                t('august'),
                t('september'),
                t('october'),
                t('november'),
                t('december'),
              ]}
            />
          )}
        </Observer>
      </div>

      <Observer>
        {() => (
          <PopularProductList
            products={product.popularProducts}
            title={t('popular-products-table-title')}
            className="lg:col-span-1 lg:col-start-2 lg:row-start-5 2xl:col-span-4 2xl:col-start-auto 2xl:row-start-auto"
          />
        )}
      </Observer>

      <Observer>
        {() => (
          <LowStockProduct
            className="col-span-full"
            onPagination={() => {}}
            title={'text-low-stock-products'}
            products={product.lowStockProducts}
          />
        )}
      </Observer>

      <Observer>
        {() => (
          <TopRatedProductWidget
            title={'text-most-rated-products'}
            products={product.topRatedProducts}
            className="lg:col-span-1 lg:col-start-1 lg:row-start-5 2xl:col-span-5 2xl:col-start-auto 2xl:row-start-auto 2xl:me-20"
          />
        )}
      </Observer>

      <Observer>
        {() => (
          <ProductCountByCategory
            title={'text-most-category-products'}
            products={product.productsByCategory}
            className="col-span-full 2xl:col-span-7 2xl:ltr:-ml-20 2xl:rtl:-mr-20"
          />
        )}
      </Observer>

      <Observer>
        {() => (
          <WithdrawTable
            className="col-span-full"
            title={t('withdraw-table-title')}
            onPagination={state.handlePagination}
            withdraws={withdraw.withdraws}
            paginatorInfo={withdraw.paginatorInfo}
          />
        )}
      </Observer>
    </div>
  );
}

export function AdminDashboard() {
  useRenderCount('AdminDashboard');
  const store = useRootStore();
  const { t } = useTranslation();
  const state = useAdminDashboard();

  return (
    <React.Fragment>
      <Observer>
        {() => {
          const queries = [
            store.analytic.analyticsQuery,
            store.order.ordersQuery,
            store.product.popularQuery,
            store.withdraw.withdrawsQuery,
            store.product.topRatedQuery,
          ];
          if (queries.some((q) => q.isLoading)) {
            return <Loader text={t('text-loading')} />;
          }

          const failed = queries.find((q) => q.isError);

          if (failed) {
            return (
              <ErrorMessage
                message={
                  store.order.ordersQuery.error?.message || store.product.popularQuery.error?.message || store.product.topRatedQuery.error?.message
                }
              />
            );
          }

          return <RenderSuccess state={state} />;
        }}
      </Observer>
    </React.Fragment>
  );
}
