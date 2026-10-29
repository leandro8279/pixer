import { observer, Observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/common/card';
import { RenderComponent } from '@/components/common/render-component';
import * as categoriesIcon from '@/components/icons/category';
import { EditIcon } from '@/components/icons/edit';
import { Button } from '@/components/ui/button';
import { Description } from '@/components/ui/description';
import { FileInput } from '@/components/ui/file-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectInput } from '@/components/ui/select-input';
import { StickyFooterPanel } from '@/components/ui/sticky-footer-panel';
import { TextArea } from '@/components/ui/text-area';
import { useRootStore } from '@/contexts/root';
import { useRouter } from '@/hooks/useRouter';
import { Category, CategoryInput } from '@/types';
import { getIcon } from '@/utils/get-icon';

import { categoryIcons } from './category-icons';
import { useCreateOrUpdateCategoriesForm } from './useCreateOrUpdateCategoriesForm';

export const updatedIcons = categoryIcons.map((item: any) => {
  item.label = (
    <div className="flex items-center space-s-5">
      <span className="flex items-center justify-center w-5 h-5">
        {getIcon({ iconList: categoriesIcon, iconName: item.value, className: 'max-h-full max-w-full' })}
      </span>
      <span className="ml-2">{item.label}</span>
    </div>
  );
  return item;
});

interface Props {
  initialValues?: Category;
}

export function CreateOrUpdateCategoriesForm(props: Props) {
  const router = useRouter();
  const { t } = useTranslation();
  const { initialValues } = props;
  const category = useRootStore('category');
  const isSlugEditable = router.searchParams.get('action') === 'edit';
  const { form, store, handleSubmit, slugAutoSuggest } = useCreateOrUpdateCategoriesForm(props.initialValues);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
        <Description
          title={t('input-label-image')}
          details={t('category-image-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput
            name="image"
            control={form.control}
            multiple={false}
          />
        </Card>
      </div>

      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('input-label-description')}
          details={`${initialValues ? t('item-description-edit') : t('item-description-add')} ${t('category-description-helper-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('input-label-name')}
            {...form.register('name')}
            error={t(form.formState.errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />

          <RenderComponent conditional={isSlugEditable}>
            <div className="relative mb-5">
              <Input
                label={t('input-label-slug')}
                {...form.register('slug')}
                error={t(form.formState.errors.slug?.message!)}
                variant="outline"
                disabled={store.isSlugDisable}
              />
              <button
                className="absolute top-6.75 right-px z-0 flex h-11.5 w-11 items-center justify-center rounded-tr rounded-br border-l border-solid border-border-base bg-white px-2 text-body transition duration-200 hover:text-heading focus:outline-none"
                type="button"
                title={t('text-edit')}
                onClick={() => store.setIsSlugDisable(false)}
              >
                <EditIcon width={14} />
              </button>
            </div>
          </RenderComponent>

          <RenderComponent conditional={!isSlugEditable}>
            <Input
              label={t('input-label-slug')}
              {...form.register('slug')}
              value={slugAutoSuggest}
              variant="outline"
              className="mb-5"
              disabled
            />
          </RenderComponent>
          <div className="relative">
            <TextArea
              label={t('input-label-details')}
              {...form.register('details')}
              variant="outline"
              className="mb-5"
            />
          </div>

          <div className="mb-5">
            <Label>{t('input-label-select-icon')}</Label>
            <SelectInput
              name="icon"
              control={form.control}
              options={updatedIcons}
              isClearable={true}
            />
          </div>

          <SelectCategories
            control={form.control}
            setValue={form.setValue}
            initialValue={initialValues}
          />
        </Card>
      </div>
      <StickyFooterPanel className="z-0">
        <div className="text-end">
          <RenderComponent conditional={initialValues}>
            <Button
              variant="outline"
              onClick={router.back}
              className="text-sm me-4 md:text-base"
              type="button"
            >
              {t('button-label-back')}
            </Button>
          </RenderComponent>

          <Observer>
            {() => (
              <Button
                className="text-sm md:text-base"
                loading={category.create.isLoading || category.update.isLoading}
                disabled={category.create.isLoading || category.update.isLoading}
              >
                {initialValues ? t('button-label-update-category') : t('button-label-add-category')}
              </Button>
            )}
          </Observer>
        </div>
      </StickyFooterPanel>
    </form>
  );
}

interface SelectCategoriesProps {
  setValue: any;
  initialValue?: Category;
  control: Control<CategoryInput>;
}

const SelectCategories = observer(({ control, initialValue }: SelectCategoriesProps) => {
  const { t } = useTranslation();
  const category = useRootStore('category');

  useEffect(() => {
    category.setParams({ limit: 999, language: 'en', ...(Boolean(initialValue?.id) && { self: initialValue?.id }) });
  }, [initialValue]);

  return (
    <div>
      <Label>{t('input-label-parent-category')}</Label>
      <SelectInput
        name="parent"
        control={control}
        isClearable={true}
        options={category.categories}
        getOptionValue={(option: any) => option.id}
        getOptionLabel={(option: any) => option.name}
        isLoading={category.categoriesQuery.isLoading}
      />
    </div>
  );
});
