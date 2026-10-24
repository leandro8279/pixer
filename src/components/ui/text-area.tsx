import classNames from 'classnames';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { RenderComponent } from '../common/render-component';
import { TooltipLabel } from './tooltip-label';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  inputClassName?: string;
  toolTipText?: string;
  label?: string;
  name: string;
  error?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
  disabled?: boolean;
}

const classes = {
  root: 'align-middle py-3 px-4 w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
  normal: 'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
  solid: 'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-border-base focus:border-accent',
  shadow: 'focus:shadow',
};

export function TextArea(props: Props) {
  const { className, label, toolTipText, name, error, variant = 'normal', shadow = false, inputClassName, disabled, required, ...rest } = props;
  const rootClassName = classNames(
    classes.root,
    {
      [classes.normal]: variant === 'normal',
      [classes.solid]: variant === 'solid',
      [classes.outline]: variant === 'outline',
    },
    {
      [classes.shadow]: shadow,
    },
    inputClassName,
  );

  return (
    <div className={twMerge(classNames(className))}>
      <RenderComponent conditional={label}>
        <TooltipLabel
          label={label}
          htmlFor={name}
          required={required}
          toolTipText={toolTipText}
        />
      </RenderComponent>
      <textarea
        id={name}
        name={name}
        className={twMerge(classNames(rootClassName, disabled ? 'cursor-not-allowed border-[#D4D8DD] bg-[#EEF1F4]' : ''))}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        rows={4}
        disabled={disabled}
        {...rest}
      />

      <RenderComponent conditional={error}>
        <p className="my-2 text-xs text-red-500 ltr:text-left rtl:text-right">{error}</p>
      </RenderComponent>
    </div>
  );
}
