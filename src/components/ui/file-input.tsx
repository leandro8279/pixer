import React from 'react';
import { Controller } from 'react-hook-form';

import { RenderComponent } from '@/components/common/render-component';
import { Uploader } from '@/components/common/uploader';
import { ValidationError } from '@/components/ui/form-validation-error';
import { TooltipLabel } from '@/components/ui/tooltip-label';

interface Props {
  control: any;
  name: string;
  multiple?: boolean;
  acceptFile?: boolean;
  helperText?: string;
  defaultValue?: any;
  maxSize?: number;
  disabled?: boolean;
  toolTipText?: string;
  label?: string;
  required?: boolean;
  error?: string;
}

export function FileInput(props: Props) {
  const { multiple = true, acceptFile = false, helperText } = props;
  const { control, name, maxSize, disabled, label, toolTipText, required, error } = props;
  return (
    <React.Fragment>
      <RenderComponent conditional={label}>
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
        render={({ field: { ref, ...rest } }) => (
          <Uploader
            {...rest}
            multiple={multiple}
            acceptFile={acceptFile}
            helperText={helperText}
            maxSize={maxSize}
            disabled={disabled}
          />
        )}
      />
      <RenderComponent conditional={error}>
        <ValidationError message={error} />
      </RenderComponent>
    </React.Fragment>
  );
}
