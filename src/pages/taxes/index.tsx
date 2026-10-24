import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/common/card';
import { PageHeading } from '@/components/common/page-heading';
import { RenderComponent } from '@/components/common/render-component';
import { Search } from '@/components/common/search';
import { TaxList } from '@/components/tax/tax-list';
import { ErrorMessage } from '@/components/ui/error-message';
import { LinkButton } from '@/components/ui/link-button';
import { Loader } from '@/components/ui/loader/loader';
import { Routes } from '@/config/routes';
import { useRootStore } from '@/contexts/root';

import { useTaxesPage } from './useTaxesPage';

export function TaxesPage() {
  const { t } = useTranslation();
  const taxe = useRootStore('taxe');
  const { handleSearch, store } = useTaxesPage();

  return (
    <React.Fragment>
      <Observer>
        {() => (
          <RenderComponent conditional={taxe.taxesQuery.isLoading}>
            <Loader text={t('text-loading')} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={taxe.taxesQuery.isError}>
            <ErrorMessage message={taxe.taxesQuery.error?.message} />
          </RenderComponent>
        )}
      </Observer>
      <Observer>
        {() => (
          <RenderComponent conditional={taxe.taxesQuery.isSuccess}>
            <Card className="mb-8 flex flex-col items-center md:flex-row">
              <div className="mb-4 md:mb-0 md:w-1/4">
                <PageHeading title={t('input-label-taxes')} />
              </div>

              <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-1/2">
                <Search
                  onSearch={handleSearch}
                  placeholderText={t('input-placeholder-search-name')}
                />

                <LinkButton
                  href={`${Routes.tax.create}`}
                  className="h-12 w-full md:w-auto md:ms-6"
                >
                  <span>+ {t('button-label-add-tax')}</span>
                </LinkButton>
              </div>
            </Card>

            <TaxList
              taxes={taxe.taxes}
              onOrder={(orderBy) => store.setParams({ orderBy })}
              onSort={(sortedBy) => store.setParams({ sortedBy })}
            />
          </RenderComponent>
        )}
      </Observer>
    </React.Fragment>
  );
}
