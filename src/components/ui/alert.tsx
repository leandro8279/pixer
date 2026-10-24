import classNames from "classnames";
import React from "react";
import { twMerge } from "tailwind-merge";

import { RenderComponent } from "@/components/common/render-component";
import { CloseIcon } from "@/components/icons/close-icon";

interface Props {
  message: string | undefined | null;
  variant?: "info" | "warning" | "error" | "success" | "infoOutline" | "warningOutline" | "errorOutline" | "successOutline";
  closeable?: boolean;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
  childClassName?: string;
}

const variantClasses: any = {
  info: "bg-blue-100 text-blue-600",
  warning: "bg-yellow-100 text-yellow-600",
  error: "bg-red-100 text-red-500",
  success: "bg-green-100 text-accent",
  infoOutline: "border border-blue-200 text-blue-600",
  warningOutline: "border border-yellow-200 text-yellow-600",
  errorOutline: "border border-red-200 text-red-600",
  successOutline: "border border-green-200 text-green-600",
};

export function Alert(props: Props) {
  const { message = "", closeable = false, variant = "info" } = props;
  const { className, childClassName, children, onClose } = props;

  return (
    <div
      className={twMerge(classNames("relative flex items-center justify-between rounded py-4 px-5 shadow-sm", variantClasses[variant], className))}
      role="alert"
    >
      <div className={twMerge(classNames(childClassName))}>
        <p className="text-sm">{message}</p>
        {children}
      </div>
      <RenderComponent conditional={closeable}>
        <button
          data-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
          title="Close alert"
          className="absolute top-1/2 -mt-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-red-500 transition-colors duration-200 -me-0.5 inset-e-2 hover:bg-gray-300 hover:bg-opacity-25 focus:bg-gray-300 focus:bg-opacity-25 focus:outline-none"
        >
          <span aria-hidden="true">
            <CloseIcon className="h-3 w-3" />
          </span>
        </button>
      </RenderComponent>
    </div>
  );
}
