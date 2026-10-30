import { useForm } from 'react-hook-form';

import { useRootStore } from '@/contexts/root';
import { Tax } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';

import { taxValidationSchema } from './tax-validation-schema';

const defaultValues = { name: '', rate: 0, country: '', state: '', zip: '', city: '' };

export const useCreateOrUpdateTaxForm = (initialValues?: Tax) => {
  const taxe = useRootStore('taxe');
  const form = useForm<Tax>({
    shouldUnregister: true,
    defaultValues: initialValues ?? defaultValues,
    resolver: yupResolver(taxValidationSchema) as any,
  });

  function onSubmit(data: Tax) {
    if (initialValues) {
      taxe.update.mutate({ id: initialValues.id!, ...data });
    } else {
      taxe.create.mutate(data);
    }
  }

  return { form, handleSubmit: form.handleSubmit(onSubmit) };
};
