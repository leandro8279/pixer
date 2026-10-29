import { useLocalObservable } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';

import { useRootStore } from '@/contexts/root';
import { Tag } from '@/types';
import { formatSlug } from '@/utils/use-slug';
import { yupResolver } from '@hookform/resolvers/yup';

import { tagIcons } from './tag-icons';
import { tagValidationSchema } from './tag-validation-schema';

export type TagFormValues = {
  name: string;
  slug: string;
  type: any;
  details: string;
  image: any;
  icon: any;
};

export const useCreateOrUpdateTagForm = (initialValues?: Tag) => {
  const tag = useRootStore('tag');
  const store = useLocalObservable(() => ({
    isSlugDisable: false,
    setIsSlugDisable(value: boolean) {
      this.isSlugDisable = value;
    },
  }));
  const form = useForm<TagFormValues>({
    defaultValues:
      initialValues ?
        {
          ...initialValues,
          icon: initialValues?.icon ? tagIcons.find((singleIcon) => singleIcon.value === initialValues?.icon!) : '',
        }
      : {},
    resolver: yupResolver(tagValidationSchema) as any,
  });

  function onSubmit(data: TagFormValues) {
    const input = {
      language: 'en',
      name: data.name,
      slug: data.slug,
      details: data.details,
      image: {
        thumbnail: data?.image?.thumbnail,
        original: data?.image?.original,
        id: data?.image?.id,
      },
      icon: data.icon?.value ?? '',
      type_id: data.type?.id,
    };

    if (!initialValues || !initialValues.translated_languages.includes('en')) {
      tag.create.mutate(input);
    } else {
      tag.update.mutate({ ...input, id: initialValues.id! });
    }
  }

  return { form, store, handleSubmit: form.handleSubmit(onSubmit), slugAutoSuggest: formatSlug(form.watch('name')) };
};
