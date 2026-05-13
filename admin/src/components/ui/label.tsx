import cn from 'classnames';
import { LabelHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export function Label({ className, ...rest }: Props) {
  return (
    <label
      className={twMerge(
        cn(
          'flex text-body-dark font-semibold text-sm leading-none mb-3',
          className,
        ),
      )}
      {...rest}
    />
  );
}

export default Label;
