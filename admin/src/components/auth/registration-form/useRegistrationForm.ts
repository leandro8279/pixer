import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation } from 'wouter';

import { Permission } from '@/types';
import { useRootStore } from '@/contexts/root-context';
import { Routes } from '@/config/routes';

import { registrationFormSchema } from './registrationFormSchema';

type FormValues = {
  name: string;
  email: string;
  password: string;
  permission: Permission;
};

export const useRegistrationForm = () => {
  const { auth } = useRootStore();
  const [, navigate] = useLocation();

  const { register, handleSubmit, formState, setError } = useForm<FormValues>({
    resolver: yupResolver(registrationFormSchema),
    defaultValues: { email: '', name: '', password: '', permission: Permission.StoreOwner },
  });

  async function onSubmit({ name, email, password, permission }: FormValues) {
    await auth.register.mutateAsync({ name, email, password, permission });

    if (auth.register.isSuccess) {
      navigate(Routes.dashboard);
    }
  }

  return { mutation: auth.register, handleSubmit: handleSubmit(onSubmit), register, errors: formState.errors, setError };
};
