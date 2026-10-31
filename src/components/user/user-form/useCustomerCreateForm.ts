import { useForm } from 'react-hook-form';

import { Routes } from '@/config/routes';
import { useRootStore } from '@/contexts/root';
import { useRouter } from '@/hooks/useRouter';
import { yupResolver } from '@hookform/resolvers/yup';

import { customerValidationSchema } from './user-validation-schema';

export const useCustomerCreateForm = () => {
  const router = useRouter();
  const user = useRootStore('user');
  const form = useForm({
    resolver: yupResolver(customerValidationSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  function onSubmit(data: { name: string; email: string; password: string }) {
    user.register.mutate(data, {
      onError: (error: any) => {
        Object.keys(error?.response?.data).forEach((field: any) => {
          form.setError(field, { type: 'manual', message: error?.response?.data[field][0] });
        });
      },
      onSuccess: () => router.push(Routes.user.list),
    });
  }

  return { form, handleSubmit: form.handleSubmit(onSubmit) };
};
