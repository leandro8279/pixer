import { Controller } from 'react-hook-form';
import cn from 'classnames';
import { InputHTMLAttributes } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { twMerge } from 'tailwind-merge';
import TooltipLabel from '@/components/ui/tooltip-label';
import RenderComponent from '@/components/common/render-component';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
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

export function PhoneNumberInput({
  label,
  required,
  showLabel = true,
  error,
  className,
  inputClassName,
  toolTipText,
  disabled,
  note,
  name,
  control,
  ...rest
}: Props) {
  return (
    <div className={twMerge(cn('mb-5', className))}>
      <Controller
        render={({ field: { onChange, value } }) => (
          <>
            <RenderComponent conditional={!!showLabel}>
              <TooltipLabel
                htmlFor={name}
                toolTipText={toolTipText}
                label={label}
                required={required}
              />
            </RenderComponent>
            <PhoneInput
              value={value}
              onChange={onChange}
              inputClass={twMerge(
                cn(
                  '!p-0 !pe-4 !ps-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base !rounded focus:!border-accent !h-12',
                  disabled
                    ? 'cursor-not-allowed !border-[#D4D8DD] !bg-[#EEF1F4] select-none'
                    : '',
                  inputClassName
                )
              )}
              dropdownClass="focus:!ring-0 !border !border-border-base !shadow-350"
              aria-invalid={!!error}
              disabled={disabled}
            />
          </>
        )}
        id={name}
        name={name}
        control={control}
        {...rest}
      />
      <RenderComponent conditional={!!note}>
        <p className="mt-2 text-xs text-body">{note}</p>
      </RenderComponent>
      <RenderComponent conditional={!!error}>
        <p className="my-2 text-xs text-red-500 text-start">{error}</p>
      </RenderComponent>
    </div>
  );
}

export default PhoneNumberInput;
