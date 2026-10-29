import { observer, Observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/common/card';
import { RenderComponent } from '@/components/common/render-component';
import * as categoriesIcon from '@/components/icons/category';
import { EditIcon } from '@/components/icons/edit';
import { Button } from '@/components/ui/button';
import { Description } from '@/components/ui/description';
import { FileInput } from '@/components/ui/file-input';
import { ValidationError } from '@/components/ui/form-validation-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectInput } from '@/components/ui/select-input';
import { StickyFooterPanel } from '@/components/ui/sticky-footer-panel';
import { TextArea } from '@/components/ui/text-area';
import { useRootStore } from '@/contexts/root';
import { useRouter } from '@/hooks/useRouter';
import { Tag } from '@/types';
import { getIcon } from '@/utils/get-icon';

import { tagIcons } from './tag-icons';
import { TagFormValues, useCreateOrUpdateTagForm } from './useCreateOrUpdateTagForm';

export const updatedIcons = tagIcons.map((item: any) => {
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
  initialValues?: Tag;
}

export function CreateOrUpdateTagForm({ initialValues }: Props) {
  const router = useRouter();
  const { t } = useTranslation();
  const tag = useRootStore('tag');
  const isSlugEditable = router.searchParams.get('action') === 'edit';
  const { form, store, handleSubmit, slugAutoSuggest } = useCreateOrUpdateTagForm(initialValues);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap pb-8 my-5 border-b border-gray-300 border-dashed sm:my-8">
        <Description
          title={t('input-label-image')}
          details={t('tag-image-helper-text')}
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
          details={`${initialValues ? t('item-description-edit') : t('item-description-add')} ${t('tag-description-helper-text')}`}
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
              <Observer>
                {() => (
                  <Input
                    label={t('input-label-slug')}
                    {...form.register('slug')}
                    error={t(form.formState.errors.slug?.message!)}
                    variant="outline"
                    disabled={store.isSlugDisable}
                  />
                )}
              </Observer>
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

          <SelectTypes
            control={form.control}
            errors={form.formState.errors}
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
                loading={tag.create.isLoading || tag.update.isLoading}
                disabled={tag.create.isLoading || tag.update.isLoading}
                className="text-sm md:text-base"
              >
                {initialValues ? t('button-label-update-tag') : t('button-label-add-tag')}
              </Button>
            )}
          </Observer>
        </div>
      </StickyFooterPanel>
    </form>
  );
}

interface SelectTypesProps {
  control: Control<TagFormValues>;
  errors: FieldErrors<TagFormValues>;
}

const SelectTypes = observer(({ control, errors }: SelectTypesProps) => {
  const { t } = useTranslation();
  const type = useRootStore('type');

  useEffect(() => {
    type.setParams({ limit: 999, language: 'en' });
  }, []);

  return (
    <div className="mb-5">
      <Label>{t('input-label-types')}</Label>
      <SelectInput
        name="type"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.slug}
        options={type.types}
        isLoading={type.typesQuery.isLoading}
      />
      {/* @ts-ignore */}
      <ValidationError message={t(errors.type?.message ?? '')} />
    </div>
  );
});
