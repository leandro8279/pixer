import { addMinutes, isSameDay, isToday } from 'date-fns';
import omit from 'lodash/omit';
import { useLocalObservable } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLocation, useSearchParams } from 'wouter';

import { useRootStore } from '@/contexts/root';
import { BalanceInput, IImage, Shop, ShopSettings, UserAddressInput } from '@/types';
import { getFormattedImage } from '@/utils/get-formatted-image';
import { formatSlug } from '@/utils/use-slug';
import { yupResolver } from '@hookform/resolvers/yup';

import { shopValidationSchema } from './shop-validation-schema';
import { updatedIcons } from './updated-icons';

interface FormValues {
  name: string;
  slug: string;
  description: string;
  cover_image: any;
  logo: any;
  balance: BalanceInput;
  address: UserAddressInput;
  settings: ShopSettings;
  isShopUnderMaintenance?: boolean;
}

export const useShopForm = (initialValues?: Shop) => {
  const [location] = useLocation();
  const shop = useRootStore('shop');
  const [searchParams] = useSearchParams();
  const form = useForm<FormValues>({
    shouldUnregister: true,
    ...(initialValues ?
      {
        defaultValues: {
          ...initialValues,
          logo: getFormattedImage(initialValues?.logo as IImage),
          cover_image: getFormattedImage(initialValues?.cover_image as IImage),
          settings: {
            ...initialValues?.settings,
            socials:
              initialValues?.settings?.socials ?
                initialValues?.settings?.socials.map((social: any) => ({
                  icon: updatedIcons?.find((icon) => icon?.value === social?.icon),
                  url: social?.url,
                }))
              : [],
          },
        },
      }
    : {}),
    // @ts-ignore
    resolver: yupResolver(shopValidationSchema),
  });
  const store = useLocalObservable(() => ({
    isSlugDisable: true,
    setIsSlugDisable(value: boolean) {
      this.isSlugDisable = value;
    },
  }));
  const startDate = useWatch({ name: 'settings.shopMaintenance.start', control: form.control });
  const untilDate = useWatch({ name: 'settings.shopMaintenance.until', control: form.control });

  const isSlugEditable = searchParams.get('action') === 'edit' || location === '/[shop]/edit';

  const filterStartTime = (date: Date) => {
    const today = isToday(new Date(startDate));
    if (today) {
      const isPastTime = new Date(startDate).getTime() > date.getTime();
      return !isPastTime;
    }

    return true;
  };

  const sameDay = useMemo(() => {
    return isSameDay(new Date(untilDate), new Date(startDate));
  }, [untilDate, startDate]);

  const filterUntilTime = (date: Date) => {
    if (sameDay) {
      const isPastTime = addMinutes(new Date(startDate), 15).getTime() > date.getTime();
      return !isPastTime;
    }

    return true;
  };

  function onSubmit(values: FormValues) {
    const settings = {
      ...values?.settings,
      location: { ...omit(values?.settings?.location, '__typename') },
      socials: values?.settings?.socials ? values?.settings?.socials?.map((social: any) => ({ icon: social?.icon?.value, url: social?.url })) : [],
      shopMaintenance: values?.settings?.shopMaintenance,
    };

    if (initialValues) {
      const { ...restAddress } = values.address;
      const balance = { id: initialValues.balance?.id, ...values.balance };

      shop.update.mutate({ id: initialValues?.id!, ...values, settings, address: restAddress, balance });
    } else {
      shop.create.mutate({ ...values, settings, balance: { ...values.balance } });
    }
  }

  return {
    form,
    store,
    untilDate,
    startDate,
    isSlugEditable,
    filterUntilTime,
    filterStartTime,
    today: new Date(),
    slugAutoSuggest: formatSlug(form.watch('name')),
    handleSubmit: form.handleSubmit(onSubmit as any),
    askForAQuote: form.watch('settings.askForAQuote.enable'),
    isMaintenanceMode: form.watch('settings.isShopUnderMaintenance'),
  };
};
