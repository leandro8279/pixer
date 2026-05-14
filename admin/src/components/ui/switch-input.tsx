import ValidationError from '@/components/ui/form-validation-error';
import TooltipLabel from '@/components/ui/tooltip-label';
import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import RenderComponent from '@/components/common/render-component';

interface Props {
  control: Control<any>;
  error?: string;
  name: string;
  disabled?: boolean;
  [key: string]: unknown;
  required?: boolean;
  label?: string;
  toolTipText?: string;
  className?: string;
  labelClassName?: string;
}

export function SwitchInput({
  control,
  label,
  name,
  error,
  disabled,
  required,
  toolTipText,
  className,
  labelClassName,
  ...rest
}: Props) {
  return (
    <>
      <div
        className={twMerge(classNames('flex items-center gap-x-4', className))}
      >
        <Controller
          name={name}
          control={control}
          {...rest}
          render={({ field: { onChange, value } }) => (
            <Switch
              checked={value}
              onChange={onChange}
              disabled={disabled}
              className={`${
                value ? 'bg-accent' : 'bg-gray-300'
              } relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none ${
                disabled ? 'cursor-not-allowed bg-[#EEF1F4]' : ''
              }`}
              dir="ltr"
              id={name}
            >
              <span className="sr-only">Enable {label}</span>
              <span
                className={`${
                  value ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-light transition-transform`}
              />
            </Switch>
          )}
        />
        <RenderComponent conditional={!!label}>
          <TooltipLabel
            htmlFor={name}
            className={classNames('mb-0', labelClassName)}
            toolTipText={toolTipText}
            label={label}
            required={required}
          />
        </RenderComponent>
      </div>
      <RenderComponent conditional={!!error}>
        <ValidationError message={error} />
      </RenderComponent>
    </>
  );
}

export default SwitchInput;
