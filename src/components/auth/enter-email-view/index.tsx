import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";

import { forgotPasswordSchema } from "./forget-password.schema";

interface Props {
  loading: boolean;
  onSubmit: (values: { email: string }) => void;
}

export function EnterEmailView(props: Props) {
  const { loading, onSubmit } = props;
  const { t } = useTranslation();
  const { register, handleSubmit, formState } = useForm<{ email: string }>({ resolver: yupResolver(forgotPasswordSchema) });
  console.log(loading);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label={t("input-label-email")}
        {...register("email")}
        type="email"
        variant="outline"
        className="mb-5"
        placeholder="demo@demo.com"
        error={t(formState.errors.email?.message || "")}
      />
      <Button className="h-11 w-full" loading={loading} disabled={loading}>
        {t("text-submit-email")}
      </Button>
    </form>
  );
}
