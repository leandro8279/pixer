import cn from 'classnames';
import type { LabelHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export function Title({ className = 'mb-3', ...rest }: Props) {
  return (
    <span
      className={twMerge(
        cn('block text-body-dark font-semibold text-sm leading-none', className)
      )}
      {...rest}
    />
  );
}

export default Title;
