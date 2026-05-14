import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { Permission } from '@/types';

import { useLocalObservable } from 'mobx-react-lite';

import { registrationFormSchema } from './registrationFormSchema';

type FormValues = {
  name: string;
  email: string;
  password: string;
  permission: Permission;
};

export const useRegistrationForm = () => {
  const store = useLocalObservable(() => ({
    errorMessage: '',
    setErrorMessage(message: string | null) {
      this.errorMessage = message || '';
    },
  }));

  const { register, handleSubmit, formState, setError } = useForm<FormValues>({
    resolver: yupResolver(registrationFormSchema),
    defaultValues: { email: '', name: '', password: '', permission: Permission.StoreOwner },
  });

  function onSubmit({ name, email, password, permission }: FormValues) {}

  return { store, handleSubmit: handleSubmit(onSubmit), register, errors: formState.errors, setError };
};
