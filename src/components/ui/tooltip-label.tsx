import { twMerge } from "tailwind-merge";

import { RenderComponent } from "@/components/common/render-component";
import { InfoIcon } from "@/components/icons/info-icon";
import { Label } from "@/components/ui/label";
import { Tooltip } from "@/components/ui/tooltip";

interface Props {
  className?: string;
  htmlFor?: string;
  label?: string;
  toolTipText?: string;
  required?: boolean;
}

export function TooltipLabel(props: Props) {
  const { className, htmlFor, label, required, toolTipText } = props;

  return (
    <Label className={twMerge(className)} htmlFor={htmlFor}>
      {label}
      <RenderComponent conditional={required}>
        <span className="ml-0.5 text-red-500">*</span>
      </RenderComponent>
      <RenderComponent conditional={toolTipText}>
        <Tooltip content={toolTipText}>
          <span className="ltr:ml-1 rtl:mr-1 text-base-dark/40 shrink-0">
            <InfoIcon className="w-3.5 h-3.5" />
          </span>
        </Tooltip>
      </RenderComponent>
    </Label>
  );
}
