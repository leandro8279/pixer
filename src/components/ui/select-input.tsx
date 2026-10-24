import React from 'react';
import { Controller } from 'react-hook-form';
import { GetOptionLabel } from 'react-select';

import { RenderComponent } from '@/components/common/render-component';
import { Select } from '@/components/ui/select';
import { TooltipLabel } from '@/components/ui/tooltip-label';

interface Props {
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

export function SelectInput(props: Props) {
  const { control, options, name, rules, getOptionLabel, getOptionValue, disabled, ...rest1 } = props;
  const { isMulti, isClearable, isLoading, placeholder, label, required, toolTipText, error, ...rest2 } = rest1;

  return (
    <React.Fragment>
      <RenderComponent conditional={label}>
        <TooltipLabel
          htmlFor={name}
          label={label}
          required={required}
          toolTipText={toolTipText}
        />
      </RenderComponent>
      <Controller
        control={control}
        name={name}
        rules={rules}
        {...rest2}
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

      <RenderComponent conditional={error}>
        <p className="my-2 text-xs text-red-500 text-start">{error}</p>
      </RenderComponent>
    </React.Fragment>
  );
}
