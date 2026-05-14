import { useLocation } from 'wouter';

import { useRootStore } from '@/contexts/root-context';
import { Routes } from '@/config/routes';
import type { LoginInput } from '@/types';

export const useLoginForm = () => {
  const { auth } = useRootStore();
  const [, navigate] = useLocation();

  async function handleSubmit({ email, password }: LoginInput) {
    await auth.login.mutateAsync({ email, password });

    if (auth.login.isSuccess) {
      navigate(Routes.dashboard);
    }
  }

  return { mutation: auth.login, handleSubmit };
};
