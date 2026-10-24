import classNames from "classnames";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { RenderComponent } from "@/components/common/render-component";
import { CloseIcon } from "@/components/icons/close-icon";
import { SearchIcon } from "@/components/icons/search-icon";

const classes = {
  root: "ps-10 pe-4 h-12 flex items-center w-full rounded-md appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0",
  normal: "bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent",
  solid: "bg-gray-100 border border-border-100 focus:bg-light focus:border-accent",
  outline: "border border-border-base focus:border-accent",
  shadow: "focus:shadow",
};

interface SearchValue {
  searchText: string;
}

interface Props {
  className?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline";
  inputClassName?: string;
  onSearch: (data: SearchValue) => void;
  placeholderText?: string;
}

export function Search(props: Props) {
  const { t } = useTranslation();
  const { className, onSearch, variant = "outline", shadow = false, inputClassName, placeholderText, ...rest } = props;

  const { register, handleSubmit, reset, formState, control } = useForm<SearchValue>({ defaultValues: { searchText: "" } });

  const errors = formState.errors;
  const searchText = useWatch({ name: "searchText", control });

  useEffect(() => {
    if (!searchText) {
      onSearch({ searchText: "" });
    }
  }, [searchText]);

  const rootClassName = classNames(
    classes.root,
    {
      [classes.normal]: variant === "normal",
      [classes.solid]: variant === "solid",
      [classes.outline]: variant === "outline",
    },
    {
      [classes.shadow]: shadow,
    },
    inputClassName,
  );

  function clear() {
    reset();
    onSearch({ searchText: "" });
  }

  return (
    <form noValidate role="search" className={twMerge(classNames("relative flex w-full items-center", className))} onSubmit={handleSubmit(onSearch)}>
      <label htmlFor="search" className="sr-only">
        {t("form:input-label-search")}
      </label>
      <button className="absolute top-1/2 -translate-y-1/2 p-2 text-body outline-none inset-s-1 focus:outline-none active:outline-none">
        <SearchIcon className="h-5 w-5" />
      </button>
      <input
        type="text"
        id="search"
        {...register("searchText")}
        className={twMerge(rootClassName)}
        placeholder={placeholderText ?? t("form:input-placeholder-search")}
        aria-label="Search"
        autoComplete="off"
        {...rest}
      />
      <RenderComponent conditional={errors.searchText}>
        <p>{errors.searchText?.message}</p>
      </RenderComponent>

      <RenderComponent conditional={!!searchText}>
        <button
          type="button"
          onClick={clear}
          className="absolute top-1/2 -translate-y-1/2 p-2 text-body outline-none inset-e-1 focus:outline-none active:outline-none"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </RenderComponent>
    </form>
  );
}
