import { useRootStore } from "@/contexts/root";

export const useForgotPasswordForm = () => {
  const auth = useRootStore("auth");
  function handleEmailSubmit(data: { email: string }) {
    auth.forgetPassword.mutate(data);
  }

  function handleTokenSubmit({ token }: { token: string }) {}

  function handleResetPassword({ password }: { password: string }) {}

  return { handleEmailSubmit, handleTokenSubmit, handleResetPassword };
};
