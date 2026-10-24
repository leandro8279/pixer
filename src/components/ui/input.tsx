import cn from "classnames";
import React from "react";
import { twMerge } from "tailwind-merge";

import { RenderComponent } from "@/components/common/render-component";
import { TooltipLabel } from "@/components/ui/tooltip-label";

import type { InputHTMLAttributes } from "react";
export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  label?: string;
  toolTipText?: string;
  note?: string;
  name: string;
  error?: string;
  type?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline";
  dimension?: "small" | "medium" | "big";
  showLabel?: boolean;
  required?: boolean;
}

const classes = {
  root: "px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0",
  normal: "bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent",
  solid: "bg-gray-100 border border-border-100 focus:bg-light focus:border-accent",
  outline: "border border-border-base focus:border-accent",
  shadow: "focus:shadow",
};
const sizeClasses = {
  small: "text-sm h-10",
  medium: "h-12",
  big: "h-14",
};

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { variant = "normal", dimension = "medium", shadow, inputClassName } = props;
  const { name, disabled, className, showLabel, label, note, error, type = "text", ...rest } = props;
  const { labelClassName, toolTipText, required } = rest;

  const rootClassName = cn(
    classes.root,
    {
      [classes.normal]: variant === "normal",
      [classes.solid]: variant === "solid",
      [classes.outline]: variant === "outline",
    },
    {
      [classes.shadow]: shadow,
    },
    sizeClasses[dimension],
    inputClassName,
  );
  const numberDisable = type === "number" && disabled ? "number-disable" : "";

  return (
    <div className={twMerge(className)}>
      <RenderComponent conditional={showLabel || label}>
        <TooltipLabel htmlFor={name} toolTipText={toolTipText} label={label} required={required} className={labelClassName} />
      </RenderComponent>
      <input
        id={name}
        name={name}
        type={type}
        ref={ref}
        className={twMerge(cn(disabled ? `cursor-not-allowed border-[#D4D8DD] bg-[#EEF1F4] ${numberDisable} select-none` : "", rootClassName))}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        disabled={disabled}
        aria-invalid={error ? "true" : "false"}
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
});
