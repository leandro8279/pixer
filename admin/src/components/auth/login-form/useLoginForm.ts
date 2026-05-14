import type { LoginInput } from '@/types';
import { useLocalObservable } from 'mobx-react-lite';

export const useLoginForm = () => {
  const store = useLocalObservable(() => ({
    errorMessage: '',
    setErrorMessage(message: string) {
      this.errorMessage = message;
    },
  }));

  function handleSubmit({ email, password }: LoginInput) {}

  return { store, handleSubmit };
};
