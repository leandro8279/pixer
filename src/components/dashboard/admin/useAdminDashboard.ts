import { reaction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useRootStore } from '@/contexts/root';
import { TodayTotalOrderByStatus } from '@/types';

export const useAdminDashboard = () => {
  const { t } = useTranslation();
  const rootStore = useRootStore();
  const analytic = useRootStore('analytic');
  const store = useLocalObservable(() => ({
    page: 1,
    searchTerm: '',
    activeTimeFrame: 1,
    orderDataRange: {} as TodayTotalOrderByStatus,
    salesByYear: Array.from({ length: 12 }, (_) => 0),
    setPage(value: number) {
      this.page = value;
    },
    setActiveTimeFrame(value: number) {
      this.activeTimeFrame = value;
    },
    setOrderDataRange(value: any) {
      this.orderDataRange = value;
    },
    setSearchTerm(value: string) {
      this.searchTerm = value;
    },
    setSalesByYear(value: number[]) {
      this.salesByYear = value;
    },
  }));

  useEffect(() => {
    console.log('rootStore');
    rootStore.withdraw.setParams({ limit: 10 });
    rootStore.order.setParams({ limit: 5, page: 1, language: 'en' });
    rootStore.product.setPopularParams({ limit: 10, language: 'en' });
    rootStore.product.setTopRatedParams({ limit: 10, language: 'en' });
    rootStore.product.setLowStockParams({ limit: 10, language: 'en' });
    rootStore.product.setCategoryParams({ limit: 10, language: 'en' });
  }, [rootStore]);

  useEffect(() => {
    const dispose = reaction(
      () => ({ activeTimeFrame: store.activeTimeFrame, analytics: analytic.analytics }),
      ({ activeTimeFrame, analytics }) => {
        switch (activeTimeFrame) {
          case 1:
            store.setOrderDataRange(analytics?.todayTotalOrderByStatus);
            break;
          case 7:
            store.setOrderDataRange(analytics?.weeklyTotalOrderByStatus);
            break;
          case 30:
            store.setOrderDataRange(analytics?.monthlyTotalOrderByStatus);
            break;
          case 365:
            store.setOrderDataRange(analytics?.yearlyTotalOrderByStatus);
            break;

          default:
            store.setOrderDataRange(store.orderDataRange);
            break;
        }
      },
    );

    return dispose;
  }, []);

  useEffect(() => {
    const dispose = reaction(
      () => analytic.analytics,
      (analytics) => {
        store.setOrderDataRange(analytics?.todayTotalOrderByStatus || {});
        if (!!analytics?.totalYearSaleByMonth?.length) {
          store.setSalesByYear(analytics.totalYearSaleByMonth.map((item: any) => item.total.toFixed(2)));
        }
      },
    );

    return dispose;
  }, []);

  const timeFrame = [
    { name: t('text-today'), day: 1 },
    { name: t('text-weekly'), day: 7 },
    { name: t('text-monthly'), day: 30 },
    { name: t('text-yearly'), day: 365 },
  ];

  function handlePagination(value: number) {
    store.setPage(value);
  }

  function handleSearch({ searchText }: { searchText: string }) {
    store.setSearchTerm(searchText);
    store.setPage(1);
  }

  return { store, timeFrame, handleSearch, handlePagination };
};
