import { useLocalObservable } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';

import { Routes } from '@/config/routes';
import { useRootStore } from '@/contexts/root';
import { useRouter } from '@/hooks/useRouter';
import { Type, TypeInput } from '@/types';
import { formatSlug } from '@/utils/use-slug';
import { yupResolver } from '@hookform/resolvers/yup';

import { typeIconList } from './group-icons';
import { typeValidationSchema } from './group-validation-schema';

export const useCreateOrUpdateTypeForm = (type?: Type) => {
  const router = useRouter();
  const typeStore = useRootStore('type');
  const form = useForm<TypeInput>({
    shouldUnregister: true,
    resolver: yupResolver(typeValidationSchema as any),
    defaultValues: {
      ...type,
      icon: type?.icon ? typeIconList.find((singleIcon) => singleIcon.value === type?.icon) : '',
    },
  });
  const store = useLocalObservable(() => ({
    isSlugDisable: false,
    setIsSlugDisable(value: boolean) {
      this.isSlugDisable = value;
    },
  }));
  function onSubmit(data: TypeInput) {
    const input = {
      language: 'en',
      name: data.name!,
      slug: data.slug!,
      icon: data.icon?.value,
      promotional_sliders: {
        thumbnail: data?.promotional_sliders?.thumbnail,
        original: data?.promotional_sliders?.original,
        id: data?.promotional_sliders?.id,
      },
    };

    if (!type || !type.translated_languages?.includes('en')) {
      typeStore.create.mutate({ ...input, ...(type?.slug && { slug: type.slug }) });
    } else {
      typeStore.update.mutate(
        { ...input, id: type.id! },
        {
          onSuccess: () => {
            const generateRedirectUrl = router.searchParams.get('shop') ? `/${router.searchParams.get('shop')}${Routes.type.list}` : Routes.type.list;
            router.push(`${generateRedirectUrl}/${type.slug}/edit`);
          },
        },
      );
    }
  }

  const slugAutoSuggest = formatSlug(form.watch('name'));

  return { form, store, slugAutoSuggest, handleSubmit: form.handleSubmit(onSubmit) };
};
