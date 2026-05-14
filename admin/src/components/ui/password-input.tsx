import { useState } from 'react';

import RenderComponent from '@/components/common/render-component';
import { Eye } from '@/components/icons/eye-icon';
import { EyeOff } from '@/components/icons/eye-off-icon';

import cn from 'classnames';

import Link from './link';

import type { InputHTMLAttributes } from 'react';
export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  forgotPassHelpText?: string;
  label: string;
  name: string;
  forgotPageLink?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
  error: string | undefined;
  required?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

const classes = {
  root: 'ltr:pl-4 rtl:pr-4 ltr:pr-12 rtl:pl-12 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
  normal: 'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
  solid: 'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-border-base focus:border-accent',
  shadow: 'focus:shadow',
};

export function PasswordInput({
  className,
  inputClassName,
  forgotPassHelpText,
  label,
  name,
  error,
  variant = 'normal',
  shadow = false,
  forgotPageLink = '',
  required,
  ref,
  ...rest
}: Props) {
  const [show, setShow] = useState(false);

  const rootClassName = cn(
    classes.root,
    {
      [classes.normal]: variant === 'normal',
      [classes.solid]: variant === 'solid',
      [classes.outline]: variant === 'outline',
    },
    shadow == true && classes.shadow,
    inputClassName,
  );

  return (
    <div className={className}>
      <div className='mb-3 flex items-center justify-between'>
        <label htmlFor={name} className='text-sm font-semibold leading-none text-body-dark'>
          {label}
          <RenderComponent conditional={!!required}>
            <span className='ml-0.5 text-red-500'>*</span>
          </RenderComponent>
        </label>

        <RenderComponent conditional={!!forgotPageLink && !!forgotPassHelpText}>
          <Link
            href={forgotPageLink}
            className='text-xs text-accent transition-colors duration-200 hover:text-accent-hover focus:font-semibold focus:text-accent-700 focus:outline-none'
          >
            {forgotPassHelpText}
          </Link>
        </RenderComponent>
      </div>

      <div className='relative'>
        <input
          id={name}
          name={name}
          type={show ? 'text' : 'password'}
          ref={ref}
          className={rootClassName}
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize='off'
          spellCheck='false'
          {...rest}
        />
        <label
          htmlFor={name}
          className='absolute top-5 -mt-2 text-body inset-e-4'
          onClick={() => setShow((prev) => !prev)}
        >
          <RenderComponent conditional={show}>
            <EyeOff className='h-5 w-5' />
          </RenderComponent>
          <RenderComponent conditional={!show}>
            <Eye className='h-5 w-5' />
          </RenderComponent>
        </label>
      </div>

      <RenderComponent conditional={!!error}>
        <p className='my-2 text-xs text-red-500 text-start'>{error}</p>
      </RenderComponent>
    </div>
  );
}

export default PasswordInput;
