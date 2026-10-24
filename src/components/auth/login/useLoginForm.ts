import type { LoginInput } from '@/types';
import { useForm } from 'react-hook-form';

import { Routes } from '@/config/routes';
import { useRootStore } from '@/contexts/root';
import { useRouter } from '@/hooks/useRouter';
import { allowedRoles, hasAccess, setAuthCredentials } from '@/utils/auth-utils';
import { yupResolver } from '@hookform/resolvers/yup';

import { loginFormSchema } from './login.schema';

export const useLoginForm = () => {
  const router = useRouter();
  const auth = useRootStore('auth');
  const { formState, register, handleSubmit } = useForm<LoginInput>({
    defaultValues: { email: 'admin@demo.com', password: 'demodemo' },
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = (data: LoginInput) => {
    auth.login.mutate(data, {
      onSuccess: (data) => {
        if (data?.token) {
          if (hasAccess(allowedRoles, data?.permissions)) {
            setAuthCredentials(data?.token, data?.permissions, data?.role);

            return router.replace(Routes.dashboard);
          }
          auth.setErrorMessage('error-enough-permission');
        } else {
          auth.setErrorMessage('error-credential-wrong');
        }
      },
    });
  };

  return {
    register,
    errors: formState.errors,
    handleSubmit: handleSubmit(onSubmit),
  };
};
