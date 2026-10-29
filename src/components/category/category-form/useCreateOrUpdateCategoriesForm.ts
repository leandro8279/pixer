import { useLocalObservable } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';

import { useRootStore } from '@/contexts/root';
import { Category, CategoryInput } from '@/types';
import { formatSlug } from '@/utils/use-slug';
import { yupResolver } from '@hookform/resolvers/yup';

import { categoryIcons } from './category-icons';
import { categoryValidationSchema } from './category-validation-schema';

export const useCreateOrUpdateCategoriesForm = (initialValues?: Category) => {
  const category = useRootStore('category');
  const store = useLocalObservable(() => ({
    isSlugDisable: false,
    setIsSlugDisable(value: boolean) {
      this.isSlugDisable = value;
    },
  }));
  const form = useForm<CategoryInput>({
    defaultValues:
      initialValues ?
        {
          ...initialValues,
          icon: initialValues?.icon ? categoryIcons.find((singleIcon) => singleIcon.value === initialValues?.icon!) : '',
        }
      : {},
    resolver: yupResolver(categoryValidationSchema) as any,
  });

  function onSubmit(data: CategoryInput) {
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
      icon: data.icon?.value || '',
      parent: data.parent?.id ?? null,
    };

    if (!initialValues || !initialValues.translated_languages.includes('en')) {
      category.create.mutate({ ...input, ...(initialValues?.slug && { slug: initialValues.slug }) });
    } else {
      category.update.mutate({ ...input, id: initialValues.id! });
    }
  }

  return { form, store, handleSubmit: form.handleSubmit(onSubmit), slugAutoSuggest: formatSlug(form.watch('name')) };
};
