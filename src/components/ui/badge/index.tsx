import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  color?: string;
  textColor?: string;
  text?: string;
  textKey?: string;
  animate?: boolean;
}

export function Badge(props: Props) {
  const { t } = useTranslation();
  const { className, color: colorOverride, textColor: textColorOverride, text, textKey, animate = false } = props;

  const classes = {
    root: "px-3 py-1.5 rounded text-xs whitespace-nowrap relative font-medium",
    animate: "animate-pulse",
    default: "bg-accent",
    text: "text-light",
  };

  return (
    <span
      className={twMerge(
        classNames(
          "inline-block",
          classes.root,
          { [classes.default]: !colorOverride, [classes.text]: !textColorOverride, [classes.animate]: animate },
          colorOverride,
          textColorOverride,
          className,
        ),
      )}
    >
      {textKey ? t(textKey) : text}
    </span>
  );
}
