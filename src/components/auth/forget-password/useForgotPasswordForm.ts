// import { useRootStore } from '@/contexts/root';

export const useForgotPasswordForm = () => {
  // const auth = useRootStore('auth');
  function handleEmailSubmit(data: { email: string }) {
    // auth.forgetPassword.mutate(data);
    console.log(data);
  }

  function handleTokenSubmit({ token }: { token: string }) {
    console.log(token);
  }

  function handleResetPassword({ password }: { password: string }) {
    console.log(password);
  }

  return { handleEmailSubmit, handleTokenSubmit, handleResetPassword };
};
