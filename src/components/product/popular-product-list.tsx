import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { RenderComponent } from "@/components/common/render-component";
import { NoDataFound } from "@/components/icons/no-data-found";
import { Scrollbar } from "@/components/ui/scrollbar";
import { usePrice } from "@/hooks/usePrice";
import { siteSettings } from "@/settings/site.settings";
import { ProductType } from "@/types";

import type { Product } from "@/types";
interface PopularProductCardProps {
  product: Product;
}

export function PopularProductCard(props: PopularProductCardProps) {
  const { name, image, product_type, type, price, max_price, min_price, sale_price } = props.product;

  const { price: currentPrice, basePrice } = usePrice({ amount: sale_price ? sale_price : price!, baseAmount: price ?? 0 });

  const { price: minPrice } = usePrice({ amount: min_price ?? 0 });
  const { price: maxPrice } = usePrice({ amount: max_price ?? 0 });

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex w-full max-w-[calc(100%-120px)] items-center pe-2">
        <div className="relative aspect-square h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border-200/60 bg-gray-100">
          <img alt={name} src={image?.thumbnail ?? siteSettings.product?.placeholder} sizes="(max-width: 768px) 100vw" className="object-cover" />
        </div>
        <div className="w-4/5 ps-3">
          <h4 className="-mb-px truncate text-[15px] font-medium text-heading">{name}</h4>
          <span className="text-[13px] text-body">{type?.name}</span>
        </div>
      </div>
      <RenderComponent conditional={product_type === ProductType.Variable}>
        <div className="mb-2 max-w-30 shrink-0 text-end">
          <span className="text-sm font-semibold text-heading/80">{minPrice}</span>
          <span> - </span>
          <span className="text-sm font-semibold text-heading/80">{maxPrice}</span>
        </div>
      </RenderComponent>

      <RenderComponent conditional={product_type !== ProductType.Variable}>
        <div className="mb-2 flex max-w-30 shrink-0 items-center text-end">
          <span className="text-sm font-semibold text-heading/80">{currentPrice}</span>
          {basePrice && <del className="text-xs text-muted ms-2 md:text-sm">{basePrice}</del>}
        </div>
      </RenderComponent>
    </div>
  );
}

interface Props {
  title?: string;
  className?: string;
  products: Product[];
}

export function PopularProductList(props: Props) {
  const { products, className, title } = props;

  const { t } = useTranslation();
  return (
    <div className={classNames("overflow-hidden rounded-lg bg-white p-6 md:p-7", className)}>
      <h3 className="before:content-'' relative mt-1 mb-6 bg-light text-lg font-semibold text-heading before:absolute before:-top-px before:h-7 before:w-1 before:rounded-tr-md before:rounded-br-md before:bg-accent ltr:before:-left-6 rtl:before:-right-6 md:before:-top-0.5 md:ltr:before:-left-7 md:rtl:before:-right-7 lg:before:h-8">
        {title}
      </h3>
      <RenderComponent conditional={products.length === 0}>
        <div className="flex h-[calc(100%-60px)] items-center justify-center">
          <div className="flex flex-col items-center py-7">
            <NoDataFound className="w-52" />
            <div className="mb-1 pt-6 text-base font-semibold text-heading">{t("empty-table-data")}</div>
            <p className="text-[13px]">{t("empty-table-sorry-text")}</p>
          </div>
        </div>
      </RenderComponent>

      <RenderComponent conditional={products.length > 0}>
        <div className="popular-product-scrollbar sidebar-scrollbar h-full max-h-93 w-[calc(100%+12px)] overflow-x-hidden lg:max-h-105 xl:max-h-135 2xl:max-h-92">
          <Scrollbar className="h-full w-full pe-3" options={{ scrollbars: { autoHide: "never" } }}>
            <div className="space-y-4">
              {products?.map((product: Product) => (
                <PopularProductCard key={product.id} product={product} />
              ))}
            </div>
          </Scrollbar>
        </div>
      </RenderComponent>
    </div>
  );
}
