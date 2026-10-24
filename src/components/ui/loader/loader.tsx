import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { RenderComponent } from "@/components/common/render-component";

import styles from "./loader.module.css";

interface Props {
  text?: string;
  className?: string;
  simple?: boolean;
  showText?: boolean;
}

export function Loader(props: Props) {
  const { t } = useTranslation();
  const { className, showText = true, text = "Loading...", simple } = props;
  return (
    <React.Fragment>
      <RenderComponent conditional={simple}>
        <div className={classNames(className, styles.simple_loading)} />
      </RenderComponent>

      <RenderComponent conditional={!simple}>
        <div className={twMerge(classNames("w-full flex flex-col items-center justify-center", className))} style={{ height: "calc(100vh - 200px)" }}>
          <div className={styles.loading} />

          <RenderComponent conditional={showText}>
            <h3 className="text-lg font-semibold text-body italic">{t(text)}</h3>
          </RenderComponent>
        </div>
      </RenderComponent>
    </React.Fragment>
  );
}
