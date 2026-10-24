import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import type { LabelHTMLAttributes } from "react";
export interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export function Label({ className, ...rest }: Props) {
  return <label className={twMerge(classNames("flex text-body-dark font-semibold text-sm leading-none mb-3", className))} {...rest} />;
}
