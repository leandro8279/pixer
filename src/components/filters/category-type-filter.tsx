import classNames from 'classnames';
import { Observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionMeta } from 'react-select';

import { RenderComponent } from '@/components/common/render-component';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { useRootStore } from '@/contexts/root';
import { ProductType } from '@/types';

interface Props {
  onCategoryFilter?: (newValue: any, actionMeta: ActionMeta<unknown>) => void;
  onTypeFilter?: (newValue: any, actionMeta: ActionMeta<unknown>) => void;
  onAuthorFilter?: (newValue: any, actionMeta: ActionMeta<unknown>) => void;
  onProductTypeFilter?: (newValue: any, actionMeta: ActionMeta<unknown>) => void;
  onManufactureFilter?: (newValue: any, actionMeta: ActionMeta<unknown>) => void;
  className?: string;
  type?: string;
  enableType?: boolean;
  enableCategory?: boolean;
  enableAuthor?: boolean;
  enableProductType?: boolean;
  enableManufacturer?: boolean;
}

export function CategoryTypeFilter(props: Props) {
  const { t } = useTranslation();
  const type = useRootStore('type');
  const author = useRootStore('author');
  const category = useRootStore('category');
  const manufacturer = useRootStore('manufacturer');
  const { onTypeFilter, onCategoryFilter, onAuthorFilter, onProductTypeFilter } = props;
  const { className, enableType, enableCategory, type: typeParam, enableAuthor, enableProductType, enableManufacturer, onManufactureFilter } = props;

  useEffect(() => {
    type.setParams({ language: 'en' });
    author.setParams({ limit: 999, language: 'en' });
    manufacturer.setParams({ limit: 999, language: 'en' });
    category.setParams({ limit: 999, language: 'en', type: typeParam });
  }, [typeParam]);

  const productType = [
    { name: 'Simple product', slug: ProductType.Simple },
    { name: 'Variable product', slug: ProductType.Variable },
  ];

  return (
    <div className={classNames('flex w-full flex-col space-y-5 rtl:space-x-reverse md:flex-row md:items-end md:space-x-5 md:space-y-0', className)}>
      <RenderComponent conditional={enableType}>
        <div className="w-full">
          <Label>{t('filter-by-group')}</Label>
          <Observer>
            {() => (
              <Select
                options={type.types}
                isLoading={type.typesQuery.isLoading}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.slug}
                placeholder={t('filter-by-group-placeholder')}
                onChange={onTypeFilter}
                isClearable={true}
              />
            )}
          </Observer>
        </div>
      </RenderComponent>

      <RenderComponent conditional={enableCategory}>
        <div className="w-full">
          <Label>{t('filter-by-category')}</Label>
          <Observer>
            {() => (
              <Select
                options={category.categories}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.slug}
                placeholder={t('filter-by-category-placeholder')}
                isLoading={category.categoriesQuery.isLoading}
                onChange={onCategoryFilter}
                isClearable={true}
              />
            )}
          </Observer>
        </div>
      </RenderComponent>

      <RenderComponent conditional={enableAuthor}>
        <div className="w-full">
          <Label>{t('filter-by-author')}</Label>
          <Observer>
            {() => (
              <Select
                options={author.authors}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.slug}
                placeholder={t('filter-by-author-placeholder')}
                isLoading={author.authorsQuery.isLoading}
                onChange={onAuthorFilter}
                isClearable={true}
              />
            )}
          </Observer>
        </div>
      </RenderComponent>

      <RenderComponent conditional={enableProductType}>
        <div className="w-full">
          <Label>Filter by Product Type</Label>
          <Select
            options={productType}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.slug}
            placeholder="Filter by product type"
            // isLoading={authorLoading}
            onChange={onProductTypeFilter}
            isClearable={true}
          />
        </div>
      </RenderComponent>

      <RenderComponent conditional={enableManufacturer}>
        <div className="w-full">
          <Label>Filter by manufacturer/publications </Label>
          <Observer>
            {() => (
              <Select
                options={manufacturer.manufacturers}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.slug}
                placeholder="Filter by product manufacturer/publications"
                isLoading={manufacturer.manufacturersQuery.isLoading}
                onChange={onManufactureFilter}
                isClearable={true}
              />
            )}
          </Observer>
        </div>
      </RenderComponent>
    </div>
  );
}
