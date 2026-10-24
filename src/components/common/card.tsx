import classNames from "classnames";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  [key: string]: unknown;
}

export function Card({ className, ...props }: Props) {
  return <div className={twMerge(classNames("rounded bg-light p-5 shadow md:p-8", className))} {...props} />;
}
