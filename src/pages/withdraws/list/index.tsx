import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/common/card';
import { PageHeading } from '@/components/common/page-heading';
import { RenderComponent } from '@/components/common/render-component';
import { ErrorMessage } from '@/components/ui/error-message';
import { Loader } from '@/components/ui/loader/loader';
import { WithdrawList } from '@/components/withdraw/withdraw-list';
import { useRootStore } from '@/contexts/root';

import { useWithdrawsPage } from './useWithdrawsPage';

export function WithdrawsPage() {
  const { t } = useTranslation();
  const withdraw = useRootStore('withdraw');
  const { handlePagination, store } = useWithdrawsPage();

  return (
    <React.Fragment>
      <Observer>
        {() => (
          <RenderComponent conditional={withdraw.withdrawsQuery.isLoading}>
            <Loader text={t('text-loading')} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={withdraw.withdrawsQuery.isError}>
            <ErrorMessage message={withdraw.withdrawsQuery.error?.message} />
          </RenderComponent>
        )}
      </Observer>
      <Observer>
        {() => (
          <RenderComponent conditional={withdraw.withdrawsQuery.isSuccess}>
            <Card className="mb-8 flex flex-row items-center justify-between">
              <div className="md:w-1/4">
                <PageHeading title={t('sidebar-nav-item-withdraws')} />
              </div>
            </Card>

            <WithdrawList
              withdraws={withdraw.withdraws}
              paginatorInfo={withdraw.paginatorInfo}
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
