import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/common/card';
import { PageHeading } from '@/components/common/page-heading';
import { RenderComponent } from '@/components/common/render-component';
import { Search } from '@/components/common/search';
import { TermsAndConditionsList } from '@/components/terms-and-conditions/terms-and-conditions-list';
import { ErrorMessage } from '@/components/ui/error-message';
import { LinkButton } from '@/components/ui/link-button';
import { Loader } from '@/components/ui/loader/loader';
import { useRootStore } from '@/contexts/root';

import { useTermsAndConditionsPage } from './useTermsAndConditionsPage';

export function TermsAndConditionsPage() {
  const { t } = useTranslation();
  const termsAndCondition = useRootStore('termsAndCondition');
  const { handlePagination, handleSearch, store } = useTermsAndConditionsPage();

  return (
    <React.Fragment>
      <Observer>
        {() => (
          <RenderComponent conditional={termsAndCondition.termsAndConditionsQuery.isLoading}>
            <Loader text={t('text-loading')} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={termsAndCondition.termsAndConditionsQuery.isError}>
            <ErrorMessage message={termsAndCondition.termsAndConditionsQuery.error?.message} />
          </RenderComponent>
        )}
      </Observer>
      <Observer>
        {() => (
          <RenderComponent conditional={termsAndCondition.termsAndConditionsQuery.isSuccess}>
            <Card className="mb-8 flex flex-col items-center md:flex-row">
              <div className="mb-4 md:mb-0 md:w-1/4">
                <PageHeading title={t('text-terms-conditions')} />
              </div>

              <div className="flex w-full flex-col items-center space-y-4 ms-auto md:w-2/3 md:flex-row md:space-y-0 xl:w-3/4 2xl:w-1/2">
                <Search onSearch={handleSearch} />

                <LinkButton
                  href="/terms-and-conditions/create"
                  className="h-12 w-full md:w-auto md:ms-6"
                >
                  <span className="hidden xl:block">+ {t('text-add-terms-conditions')}</span>
                  <span className="xl:hidden">+ {t('button-label-add')}</span>
                </LinkButton>
              </div>
            </Card>
            <TermsAndConditionsList
              termsAndConditions={termsAndCondition.termsAndConditions}
              paginatorInfo={termsAndCondition.paginatorInfo}
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
