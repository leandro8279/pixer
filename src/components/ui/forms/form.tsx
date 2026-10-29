import React, { useEffect } from 'react';
import { FieldValues, Path, SubmitHandler, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';

import { RenderComponent } from '@/components/common/render-component';
import { yupResolver } from '@hookform/resolvers/yup';

import type { Schema } from 'yup';

type ServerErrors<T> = {
  [Property in keyof T]: string;
};

type Props<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  useFormProps?: UseFormProps<TFormValues>;
  validationSchema?: Schema<TFormValues>;
  fieldErrors?: ServerErrors<Partial<TFormValues>> | null;
  formError?: string | string[] | null;
};

export const Form = <TFormValues extends Record<string, any> = Record<string, any>>(props: Props<TFormValues>) => {
  const { formError, children, onSubmit, fieldErrors, useFormProps, validationSchema } = props;
  //@ts-ignore
  const methods = useForm<TFormValues>({
    ...useFormProps, //@ts-ignore
    ...(validationSchema && { resolver: yupResolver(validationSchema) }),
  });

  useEffect(() => {
    if (fieldErrors) {
      Object.entries(fieldErrors).forEach(([key, value]) => {
        methods.setError(key as Path<TFormValues>, {
          type: 'manual',
          message: value,
        });
      });
    }
  }, [fieldErrors, methods]);

  return (
    <div>
      <RenderComponent conditional={formError}>
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Oops! </span>
          {formError}
        </p>
      </RenderComponent>
      <form
        noValidate
        onSubmit={methods.handleSubmit(onSubmit as any)} //@ts-ignore
        {...formProps}
      >
        {children(methods as any)}
      </form>
    </div>
  );
};
