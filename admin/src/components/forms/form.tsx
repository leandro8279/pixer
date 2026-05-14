/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import RenderComponent from '@/components/common/render-component';

import { yupResolver } from '@hookform/resolvers/yup';

import type { Schema } from 'yup';
import type { FieldValues, Path, SubmitHandler, UseFormProps, UseFormReturn } from 'react-hook-form';

type ServerErrors<T> = {
  [Property in keyof T]: string;
};

interface FormProps<TFormValues extends FieldValues> {
  onSubmit: SubmitHandler<TFormValues>;
  formError?: string | string[] | null;
  useFormProps?: UseFormProps<TFormValues>;
  validationSchema?: Schema<TFormValues> | any;
  fieldErrors?: ServerErrors<Partial<TFormValues>> | null;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
}

export function Form<TFormValues extends Record<string, any> = Record<string, any>>(props: FormProps<TFormValues>) {
  const { children, onSubmit, formError, useFormProps, validationSchema, fieldErrors, ...formProps } = props;
  const methods = useForm<TFormValues>({
    ...useFormProps,
    ...(validationSchema && { resolver: yupResolver(validationSchema) }),
  });

  useEffect(() => {
    if (fieldErrors) {
      Object.entries(fieldErrors).forEach(([key, value]) => {
        methods.setError(key as Path<TFormValues>, { type: 'manual', message: value });
      });
    }
  }, [fieldErrors, methods]);

  return (
    <div>
      <RenderComponent conditional={formError}>
        <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
          <span className='font-medium'>Oops! </span>
          {formError}
        </p>
      </RenderComponent>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit)} {...formProps}>
        {children(methods)}
      </form>
    </div>
  );
}
