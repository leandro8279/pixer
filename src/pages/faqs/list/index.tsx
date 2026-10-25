import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/common/card';
import { PageHeading } from '@/components/common/page-heading';
import { RenderComponent } from '@/components/common/render-component';
import { Search } from '@/components/common/search';
import { FaqsList } from '@/components/faqs/faqs-list';
import { ErrorMessage } from '@/components/ui/error-message';
import { LinkButton } from '@/components/ui/link-button';
import { Loader } from '@/components/ui/loader/loader';
import { useRootStore } from '@/contexts/root';

import { useFaqsPage } from './useFaqsPage';

export function FaqsPage() {
  const { t } = useTranslation();
  const faq = useRootStore('faq');
  const { handlePagination, handleSearch, store } = useFaqsPage();
  return (
    <React.Fragment>
      <Observer>
        {() => (
          <RenderComponent conditional={faq.faqsQuery.isLoading}>
            <Loader text={t('text-loading')} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={faq.faqsQuery.isError}>
            <ErrorMessage message={faq.faqsQuery.error?.message} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={faq.faqsQuery.isSuccess}>
            <Card className="mb-8 flex flex-col items-center md:flex-row">
              <div className="mb-4 md:mb-0 md:w-1/4">
                <PageHeading title={t('form-title-faqs')} />
              </div>

              <div className="flex w-full flex-col items-center space-y-4 ms-auto md:w-2/3 md:flex-row md:space-y-0 xl:w-3/4 2xl:w-1/2">
                <Search onSearch={handleSearch} />

                <LinkButton
                  href="/faqs/create"
                  className="h-12 w-full md:w-auto md:ms-6"
                >
                  <span className="hidden xl:block">+ {t('button-label-add-faq')}</span>
                  <span className="xl:hidden">+ {t('button-label-add')}</span>
                </LinkButton>
              </div>
            </Card>
            <FaqsList
              faqs={faq.faqs}
              paginatorInfo={faq.paginatorInfo}
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
