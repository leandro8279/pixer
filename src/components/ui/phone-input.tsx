import classNames from 'classnames';
import React from 'react';
import { Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { RenderComponent } from '@/components/common/render-component';
import { TooltipLabel } from '@/components/ui/tooltip-label';

import { Input } from './input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  note?: string;
  name: string;
  error?: string;
  type?: string;
  toolTipText?: string;
  showLabel?: boolean;
  required?: boolean;
  control: any;
}

export function PhoneInput(props: Props) {
  const { label, required, showLabel = true, error, className, inputClassName, toolTipText, disabled, note, name, control, ...rest } = props;
  return (
    <div className={twMerge(classNames('mb-5', className))}>
      <Controller
        render={({ field: { onChange, value } }) => (
          <>
            <RenderComponent conditional={showLabel}>
              <TooltipLabel
                label={label}
                htmlFor={name}
                required={required}
                toolTipText={toolTipText}
              />
            </RenderComponent>
            <Input
              value={value}
              onChange={onChange}
              name="settings.contact"
              className={twMerge(
                classNames(
                  'p-0! pe-4! ps-14! flex! items-center! w-full! appearance-none! transition! duration-300! ease-in-out! text-heading! text-sm! focus:outline-none! focus:ring-0! border! border-border-base! rounded! focus:border-accent! h-12!',
                  disabled ? `cursor-not-allowed border-[#D4D8DD]! bg-[#EEF1F4]! select-none` : '',
                  inputClassName,
                ),
              )}
              // dropdownClass="focus:!ring-0 !border !border-border-base !shadow-350"
              aria-invalid={error ? 'true' : 'false'}
              disabled={disabled}
            />
          </>
        )}
        id={name}
        name={name}
        control={control}
        {...rest}
      />
      <RenderComponent conditional={note}>
        <p className="mt-2 text-xs text-body">{note}</p>
      </RenderComponent>

      <RenderComponent conditional={error}>
        <p className="my-2 text-xs text-red-500 text-start">{error}</p>
      </RenderComponent>
    </div>
  );
}
