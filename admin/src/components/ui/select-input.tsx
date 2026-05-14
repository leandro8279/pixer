import Select from '@/components/ui/select/select';
import TooltipLabel from '@/components/ui/tooltip-label';
import { Controller } from 'react-hook-form';
import type { GetOptionLabel } from 'react-select';
import RenderComponent from '@/components/common/render-component';

interface SelectInputProps {
  control: any;
  rules?: any;
  name: string;
  options: object[];
  getOptionLabel?: GetOptionLabel<unknown>;
  getOptionValue?: GetOptionLabel<unknown>;
  isMulti?: boolean;
  isClearable?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  [key: string]: unknown;
  placeholder?: string;
  required?: boolean;
  label?: string;
  toolTipText?: string;
  error?: string;
}

export function SelectInput({
  control,
  options,
  name,
  rules,
  getOptionLabel,
  getOptionValue,
  disabled,
  isMulti,
  isClearable,
  isLoading,
  placeholder,
  label,
  required,
  toolTipText,
  error,
  ...rest
}: SelectInputProps) {
  return (
    <>
      <RenderComponent conditional={!!label}>
        <TooltipLabel
          htmlFor={name}
          toolTipText={toolTipText}
          label={label}
          required={required}
        />
      </RenderComponent>
      <Controller
        control={control}
        name={name}
        rules={rules}
        {...rest}
        render={({ field }) => (
          <Select
            {...field}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            placeholder={placeholder}
            isMulti={isMulti}
            isClearable={isClearable}
            isLoading={isLoading}
            options={options}
            isDisabled={disabled as boolean}
          />
        )}
      />
      <RenderComponent conditional={!!error}>
        <p className="my-2 text-xs text-red-500 text-start">{error}</p>
      </RenderComponent>
    </>
  );
}

export default SelectInput;
