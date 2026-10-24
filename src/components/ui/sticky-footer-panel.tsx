import classNames from 'classnames';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function StickyFooterPanel(props: Props) {
  const { children, className, ...rest } = props;
  return (
    <div
      className={twMerge(classNames('sticky bottom-0 -mx-5 bg-gray-100/10 py-3 px-5 backdrop-blur text-end md:py-5 lg:-mx-8 lg:px-8', className))}
      {...rest}
    >
      {children}
    </div>
  );
}
