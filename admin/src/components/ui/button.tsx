import cn from 'classnames';
import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import RenderComponent from '@/components/common/render-component';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'normal' | 'outline' | 'custom';
  size?: 'big' | 'medium' | 'small';
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
}

const classes = {
  root: 'inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700',
  normal:
    'bg-accent text-light border border-transparent hover:bg-accent-hover',
  custom: 'border border-transparent',
  outline:
    'border border-border-400 bg-transparent text-body hover:text-light hover:bg-accent hover:border-accent',
  loading:
    'h-4 w-4 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin',
  disabled:
    'border border-border-base bg-[#EEF1F4] border-[#D4D8DD] text-body cursor-not-allowed',
  disabledOutline: 'border border-border-base text-muted cursor-not-allowed',
  small: 'px-3 py-0 h-9 text-sm h-10',
  medium: 'px-5 py-0 h-12',
  big: 'px-10 py-0 h-14',
};

export function Button({
  className,
  variant = 'normal',
  size = 'medium',
  active,
  children,
  loading = false,
  disabled = false,
  ref,
  ...rest
}: ButtonProps) {
  const classesName = cn(
    classes.root,
    {
      [classes.normal]: !disabled && variant === 'normal',
      [classes.disabled]: disabled && variant === 'normal',
      [classes.outline]: !disabled && variant === 'outline',
      [classes.disabledOutline]: disabled && variant === 'outline',
      [classes.small]: size === 'small',
      [classes.medium]: size === 'medium',
      [classes.big]: size === 'big',
    },
    className
  );

  return (
    <button
      aria-pressed={active}
      data-variant={variant}
      ref={ref}
      className={twMerge(classesName)}
      disabled={disabled}
      {...rest}
    >
      {children}
      <RenderComponent conditional={loading}>
        <span
          className={classes.loading}
          style={{
            borderTopColor:
              variant === 'outline' ? 'currentColor' : '#ffffff',
          }}
        />
      </RenderComponent>
    </button>
  );
}

export default Button;
