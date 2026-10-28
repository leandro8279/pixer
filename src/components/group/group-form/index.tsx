import { Observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/common/card';
import { RenderComponent } from '@/components/common/render-component';
import { EditIcon } from '@/components/icons/edit';
import * as typeIcons from '@/components/icons/type';
import { Button } from '@/components/ui/button';
import { Description } from '@/components/ui/description';
import { FileInput } from '@/components/ui/file-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectInput } from '@/components/ui/select-input';
import { StickyFooterPanel } from '@/components/ui/sticky-footer-panel';
import { useRootStore } from '@/contexts/root';
import { useRouter } from '@/hooks/useRouter';
import { Type } from '@/types';
import { getIcon } from '@/utils/get-icon';

import { typeIconList } from './group-icons';
import { useCreateOrUpdateTypeForm } from './useCreateOrUpdateTypeForm';

interface Props {
  type?: Type;
}

export const updatedIcons = typeIconList.map((item: any) => {
  item.label = (
    <div className="flex items-center space-s-5">
      <span className="flex h-5 w-5 items-center justify-center">
        {getIcon({ iconList: typeIcons, iconName: item.value, className: 'max-h-full max-w-full' })}
      </span>
      <span className="ml-2">{item.label}</span>
    </div>
  );
  return item;
});

export function CreateOrUpdateTypeForm(props: Props) {
  const { type } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const typeStore = useRootStore('type');
  const isSlugEditable = router.searchParams.get('edit');
  const { form, store, slugAutoSuggest, handleSubmit } = useCreateOrUpdateTypeForm(type);

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('item-description')}
          details={`${type ? t('item-description-update') : t('item-description-add')} ${t('type-description-help-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
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
                    label={`${t('Slug')}`}
                    {...form.register('slug')}
                    error={t(form.formState.errors.slug?.message!)}
                    variant="outline"
                    disabled={store.isSlugDisable}
                  />
                )}
              </Observer>
              <button
                className="absolute top-6.75 right-px z-10 flex h-11.5 w-11 items-center justify-center rounded-tr rounded-br border-l border-solid border-border-base bg-white px-2 text-body transition duration-200 hover:text-heading focus:outline-none"
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
              label={`${t('Slug')}`}
              {...form.register('slug')}
              value={slugAutoSuggest}
              variant="outline"
              className="mb-5"
              disabled
            />
          </RenderComponent>
          <div className="mb-5">
            <Label>{t('input-label-select-icon')}</Label>
            <SelectInput
              name="icon"
              control={form.control}
              options={updatedIcons}
              isClearable={true}
              placeholder="Select Icon"
            />
          </div>
        </Card>
      </div>

      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('promotional-image')}
          details={t('promotional-image-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput
            name="promotional_sliders"
            control={form.control}
            multiple={false}
          />
        </Card>
      </div>
      <StickyFooterPanel>
        <div className="mb-4 text-end">
          <RenderComponent conditional={type}>
            <Button
              variant="outline"
              onClick={router.back}
              className="me-4"
              type="button"
            >
              {t('button-label-back')}
            </Button>
          </RenderComponent>

          <Button loading={typeStore.create.isLoading || typeStore.update.isLoading}>
            {type ? t('button-label-update-group') : t('button-label-add-group')}
          </Button>
        </div>
      </StickyFooterPanel>
    </form>
  );
}
