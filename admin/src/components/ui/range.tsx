import TooltipLabel from '@/components/ui/tooltip-label';
import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import RenderComponent from '@/components/common/render-component';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  toolTipText?: string;
  note?: string;
  name: string;
  error?: string;
  showLabel?: boolean;
  required?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

export function Range({
  className,
  label,
  note,
  name,
  error,
  disabled,
  showLabel = true,
  required,
  toolTipText,
  ref,
  ...rest
}: Props) {
  return (
    <div className={twMerge(className)}>
      <RenderComponent conditional={!!showLabel}>
        <TooltipLabel
          htmlFor={name}
          toolTipText={toolTipText}
          label={label}
          required={required}
        />
      </RenderComponent>
      <input
        id={name}
        name={name}
        type="range"
        ref={ref}
        className={
          disabled
            ? 'cursor-not-allowed border-[#D4D8DD] bg-[#EEF1F4] select-none'
            : ''
        }
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        disabled={disabled}
        aria-invalid={!!error}
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

export default Range;
