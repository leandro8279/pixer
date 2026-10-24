import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/common/card';
import { RenderComponent } from '@/components/common/render-component';
import { EditIcon } from '@/components/icons/edit';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Description } from '@/components/ui/description';
import { FileInput } from '@/components/ui/file-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import { SelectInput } from '@/components/ui/select-input';
import { StickyFooterPanel } from '@/components/ui/sticky-footer-panel';
import { SwitchInput } from '@/components/ui/switch-input';
import { TextArea } from '@/components/ui/text-area';
import { useRootStore } from '@/contexts/root';
import { Shop, ShopSocialInput } from '@/types';
import { getAuthCredentials } from '@/utils/auth-utils';
import { STAFF, STORE_OWNER, SUPER_ADMIN } from '@/utils/constants';

import { updatedIcons } from './updated-icons';
import { useShopForm } from './useShopForm';

export function ShopForm({ initialValues }: { initialValues?: Shop }) {
  const { t } = useTranslation();
  const shop = useRootStore('shop');
  const setting = useRootStore('setting');
  const { permissions } = getAuthCredentials();
  const { form, store, ...state } = useShopForm(initialValues);

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'settings.socials' });

  const coverImageInformation = (
    <span>
      {t('shop-cover-image-help-text')} <br />
      {t('cover-image-dimension-help-text')} &nbsp;
      <span className="font-bold">1170 x 435{t('text-px')}</span>
    </span>
  );

  return (
    <form
      onSubmit={state.handleSubmit}
      noValidate
    >
      <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
        <Description
          title={t('input-label-logo')}
          details={t('shop-logo-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput
            name="logo"
            multiple={false}
            control={form.control}
          />
        </Card>
      </div>

      <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
        <Description
          title={t('shop-cover-image-title')}
          details={coverImageInformation}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput
            name="cover_image"
            multiple={false}
            control={form.control}
          />
        </Card>
      </div>

      <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
        <Description
          title={t('shop-basic-info')}
          details={t('shop-basic-info-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('input-label-name')}
            {...form.register('name')}
            variant="outline"
            className="mb-5"
            error={t(form.formState.errors.name?.message!)}
            required
          />

          <Observer>
            {() => (
              <RenderComponent conditional={state.isSlugEditable}>
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
            )}
          </Observer>

          <Observer>
            {() => (
              <RenderComponent conditional={!state.isSlugEditable}>
                <Input
                  label={t('input-label-slug')}
                  {...form.register('slug')}
                  value={state.slugAutoSuggest}
                  variant="outline"
                  className="mb-5"
                  disabled
                />
              </RenderComponent>
            )}
          </Observer>

          <div className="relative">
            <TextArea
              label={t('input-label-description')}
              {...form.register('description')}
              variant="outline"
              error={t(form.formState.errors.description?.message!)}
            />
          </div>
        </Card>
      </div>

      <div className="flex flex-wrap pb-8 my-5 border-b border-gray-300 border-dashed sm:my-8">
        <Description
          title={t('shop-payment-info')}
          details={t('payment-info-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('input-label-account-holder-name')}
            {...form.register('balance.payment_info.name')}
            variant="outline"
            className="mb-5"
            error={t(form.formState.errors.balance?.payment_info?.name?.message!)}
            required
          />
          <Input
            label={t('input-label-account-holder-email')}
            {...form.register('balance.payment_info.email')}
            variant="outline"
            className="mb-5"
            error={t(form.formState.errors.balance?.payment_info?.email?.message!)}
            required
          />
          <Input
            label={t('input-label-bank-name')}
            {...form.register('balance.payment_info.bank')}
            variant="outline"
            className="mb-5"
            error={t(form.formState.errors.balance?.payment_info?.bank?.message!)}
            required
          />
          <Input
            label={t('input-label-account-number')}
            {...form.register('balance.payment_info.account')}
            variant="outline"
            error={t(form.formState.errors.balance?.payment_info?.account?.message!)}
            required
          />
        </Card>
      </div>

      <div className="flex flex-wrap pb-8 my-5 border-b border-gray-300 border-dashed sm:my-8">
        <Description
          title={t('shop-address')}
          details={t('shop-address-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('input-label-country')}
            {...form.register('address.country')}
            variant="outline"
            className="mb-5"
            error={t(form.formState.errors.address?.country?.message!)}
          />
          <Input
            label={t('input-label-city')}
            {...form.register('address.city')}
            variant="outline"
            className="mb-5"
            error={t(form.formState.errors.address?.city?.message!)}
          />
          <Input
            label={t('input-label-state')}
            {...form.register('address.state')}
            variant="outline"
            className="mb-5"
            error={t(form.formState.errors.address?.state?.message!)}
          />
          <Input
            label={t('input-label-zip')}
            {...form.register('address.zip')}
            variant="outline"
            className="mb-5"
            error={t(form.formState.errors.address?.zip?.message!)}
          />
          <TextArea
            label={t('input-label-street-address')}
            {...form.register('address.street_address')}
            variant="outline"
            error={t(form.formState.errors.address?.street_address?.message!)}
          />
        </Card>
      </div>

      <RenderComponent conditional={permissions?.includes(STORE_OWNER)}>
        <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
          <Description
            title={t('form-notification-title')}
            details={t('form-notification-description')}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />

          <Card className="w-full mb-5 sm:w-8/12 md:w-2/3">
            <Input
              label={t('input-notification-email')}
              {...form.register('settings.notifications.email')}
              error={t(form.formState.errors?.settings?.notifications?.email?.message!)}
              variant="outline"
              className="mb-5"
              disabled={permissions?.includes(SUPER_ADMIN)}
              type="email"
            />
            <div className="flex items-center gap-x-4">
              <SwitchInput
                name="settings.notifications.enable"
                control={form.control}
                disabled={permissions?.includes(SUPER_ADMIN)}
              />
              <Label className="mb-0.5!">{t('input-enable-notification')}</Label>
            </div>
          </Card>
        </div>
      </RenderComponent>

      <div className="flex flex-wrap pb-8 my-5 border-b border-gray-300 border-dashed sm:my-8">
        <Description
          title={t('shop-settings')}
          details={t('shop-settings-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <PhoneInput
            name="settings.contact"
            label={t('input-label-contact')}
            required
            control={form.control}
            error={t(form.formState.errors.settings?.contact?.message!)}
          />
          <Input
            label={t('input-label-website')}
            {...form.register('settings.website')}
            variant="outline"
            className="mb-5"
            error={t(form.formState.errors.settings?.website?.message!)}
            required
          />
        </Card>
      </div>

      <div className="flex flex-wrap pb-8 my-5 border-b border-gray-300 border-dashed sm:my-8">
        <Description
          title={t('social-settings')}
          details={t('social-settings-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div>
            {fields?.map((item: ShopSocialInput & { id: string }, index: number) => (
              <div
                className="py-5 border-b border-dashed border-border-200 first:mt-0 first:border-t-0 first:pt-0 last:border-b-0 md:py-8 md:first:mt-0"
                key={item.id + 1}
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-5">
                  <div className="sm:col-span-2">
                    <Label>{t('input-label-select-platform')}</Label>
                    <SelectInput
                      name={`settings.socials.${index}.icon` as const}
                      control={form.control}
                      options={updatedIcons}
                      isClearable={true}
                      defaultValue={item?.icon!}
                    />
                  </div>

                  <Input
                    className="sm:col-span-2"
                    label={t('input-label-url')}
                    variant="outline"
                    {...form.register(`settings.socials.${index}.url` as const)}
                    error={t(form.formState.errors?.settings?.socials?.[index]?.url?.message!)}
                    defaultValue={item.url!} // make sure to set up defaultValue
                    required
                  />
                  <button
                    onClick={() => remove(index)}
                    type="button"
                    className="text-sm text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none sm:col-span-1 sm:mt-4"
                  >
                    {t('button-label-remove')}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Button
            type="button"
            onClick={() => append({ icon: '', url: '' })}
            className="w-full text-sm sm:w-auto md:text-base"
          >
            {t('button-label-add-social')}
          </Button>
        </Card>
      </div>

      <RenderComponent conditional={!permissions?.includes(SUPER_ADMIN)}>
        <div className="flex flex-wrap pb-8 my-5 border-b border-gray-300 border-dashed sm:my-8">
          <Description
            title="Shop maintenance settings "
            details="Control all the maintenance settings related to this shop."
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div className="my-5">
              <SwitchInput
                name="settings.isShopUnderMaintenance"
                label={t('input-label-enable-maintenance-mode')}
                toolTipText={t('input-tooltip-enable-maintenance-mode')}
                control={form.control}
              />
            </div>

            <div className="my-5 mt-10">
              <FileInput
                name="settings.shopMaintenance.image"
                control={form.control}
                multiple={false}
                disabled={!state.isMaintenanceMode}
              />
            </div>

            <div className="my-5 mt-10">
              <Input
                label={t('input-label-title')}
                toolTipText={t('input-tooltip-maintenance-title')}
                {...form.register('settings.shopMaintenance.title')}
                error={t(form.formState.errors?.settings?.shopMaintenance?.title?.message!)}
                variant="outline"
                className="mb-5"
                {...(state.isMaintenanceMode && { required: true })}
                disabled={!state.isMaintenanceMode}
              />
              <TextArea
                label={t('input-label-description')}
                toolTipText={t('input-tooltip-maintenance-description')}
                {...form.register('settings.shopMaintenance.description')}
                error={t(form.formState.errors?.settings?.shopMaintenance?.description?.message!)}
                variant="outline"
                className="mb-5"
                {...(state.isMaintenanceMode && { required: true })}
                disabled={!state.isMaintenanceMode}
              />
              <div className="mb-5">
                <DatePicker
                  control={form.control}
                  name="settings.shopMaintenance.start"
                  minDate={state.today}
                  startDate={new Date(state.startDate)}
                  // locale={locale}
                  placeholder="Start Date"
                  disabled={!state.isMaintenanceMode}
                  label={t('maintenance-start-time')}
                  toolTipText={t('input-tooltip-maintenance-start-time')}
                  {...(state.isMaintenanceMode && { required: true })}
                  error={t(form.formState.errors?.settings?.shopMaintenance?.start?.message!)}
                  showTimeSelect
                  timeFormat="h:mm aa"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  filterTime={state.filterStartTime}
                />
              </div>
              <div className="w-full">
                <DatePicker
                  control={form.control}
                  name="settings.shopMaintenance.until"
                  disabled={!state.startDate || !state.isMaintenanceMode}
                  minDate={new Date(state.startDate)}
                  placeholder="End Date"
                  // locale={locale}
                  {...(state.isMaintenanceMode && { required: true })}
                  toolTipText={t('input-tooltip-maintenance-end-time')}
                  label={t('maintenance-end-date')}
                  error={t(form.formState.errors?.settings?.shopMaintenance?.until?.message!)}
                  showTimeSelect
                  timeFormat="h:mm aa"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  filterTime={state.filterUntilTime}
                />
              </div>
            </div>
          </Card>
        </div>
      </RenderComponent>

      <Observer>
        {() => (
          <RenderComponent
            conditional={
              !permissions?.includes(SUPER_ADMIN) &&
              !permissions?.includes(STAFF) &&
              !Boolean(initialValues?.is_active) &&
              Boolean(setting.settings?.options?.isMultiCommissionRate)
            }
          >
            <div className="flex flex-wrap pb-8 my-5 border-b border-gray-300 border-dashed sm:my-8">
              <Description
                title="Ask for a quote?"
                details="Set your ask for a quote here."
                className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
              />

              <Card className="w-full sm:w-8/12 md:w-2/3">
                <SwitchInput
                  name="settings.askForAQuote.enable"
                  control={form.control}
                  label="Ask for a quote?"
                  className={state.askForAQuote ? 'mb-4' : ''}
                />
                <RenderComponent conditional={state.askForAQuote}>
                  <React.Fragment>
                    <Input
                      label="Quote"
                      {...form.register('settings.askForAQuote.quote')}
                      variant="outline"
                      className="mb-5"
                      error={t(form.formState.errors?.settings?.askForAQuote?.quote?.message!)}
                      required
                    />
                    <TextArea
                      label="Ask for a quote content."
                      {...form.register('settings.askForAQuote.content')}
                      variant="outline"
                      error={t(form.formState.errors?.settings?.askForAQuote?.content?.message!)}
                      required
                    />
                  </React.Fragment>
                </RenderComponent>
              </Card>
            </div>
          </RenderComponent>
        )}
      </Observer>

      <StickyFooterPanel className="z-0">
        <div className="mb-5 text-end">
          <Observer>
            {() => (
              <Button
                loading={shop.create.isLoading || shop.update.isLoading}
                disabled={shop.create.isLoading || shop.update.isLoading}
              >
                {initialValues ? t('button-label-update') : t('button-label-save')}
              </Button>
            )}
          </Observer>
        </div>
      </StickyFooterPanel>
    </form>
  );
}
