import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { RenderComponent } from "@/components/common/render-component";
import { IosArrowDown } from "@/components/icons/ios-arrow-down";
import { IosArrowUp } from "@/components/icons/ios-arrow-up";

interface Props {
  titleTransKey: string;
  icon?: React.JSX.Element;
  color?: string;
  price?: string | number;
  indicator?: "up" | "down";
  indicatorText?: string;
  note?: string;
  link?: string;
  linkText?: string;
  iconClassName?: string;
  subtitleTransKey?: string;
  iconBgStyle?: { [key: string]: string };
}

export function StickerCard(props: Props) {
  const { t } = useTranslation();
  const { titleTransKey, subtitleTransKey, icon, color, price, indicator, indicatorText, note, link, linkText, iconClassName } = props;

  return (
    <div
      className="flex h-full w-full flex-col rounded-lg border border-b-4 border-border-200 bg-light p-5 md:p-6"
      style={{ borderBottomColor: color }}
    >
      <div className="mb-auto flex w-full items-center justify-between">
        <div className={twMerge(classNames("flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100/80 me-3", iconClassName))}>
          {icon}
        </div>
        <div className="flex w-full flex-col text-end">
          <span className="mb-1 text-base font-normal text-body">{t(titleTransKey)}</span>
          <span className="text-xs font-semibold text-body">{t(subtitleTransKey || "")}</span>
          <span className="mb-2 text-2xl font-semibold text-heading">{price}</span>
        </div>
      </div>

      <RenderComponent conditional={indicator === "up"}>
        <span className="mb-12 inline-block text-sm font-semibold text-body" style={{ color: "#03D3B5" }}>
          <IosArrowUp width="9px" height="11px" className="inline-block" /> {indicatorText}
          <span className="text-sm font-normal text-body"> {note}</span>
        </span>
      </RenderComponent>

      <RenderComponent conditional={indicator === "down"}>
        <span className="mb-12 inline-block text-sm font-semibold text-body" style={{ color: "#FC6687" }}>
          <IosArrowDown width="9px" height="11px" className="inline-block" /> {indicatorText}
          <span className="text-sm font-normal text-body"> {note}</span>
        </span>
      </RenderComponent>

      <RenderComponent conditional={link}>
        <a className="text-xs font-semibold text-purple-700 no-underline" href={link} target="_blank" rel="noreferrer">
          {linkText}
        </a>
      </RenderComponent>
    </div>
  );
}
