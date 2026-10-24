import { useMemo } from "react";

import { useSettings } from "@/contexts/settings";
import { siteSettings } from "@/settings/site.settings";

interface FormatPriceProps {
  amount: number;
  currencyCode: string;
  locale: string;
  fractions: number;
}

export function formatPrice({ amount, currencyCode, locale, fractions = 2 }: FormatPriceProps) {
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: fractions > 20 || fractions < 0 || !fractions ? 2 : fractions,
  });

  return formatCurrency.format(amount);
}

interface FormatVariantPriceProps {
  baseAmount: number;
  amount: number;
  currencyCode: string;
  locale: string;
  fractions: number;
}

export function formatVariantPrice({ amount, baseAmount, currencyCode, locale, fractions = 2 }: FormatVariantPriceProps) {
  const hasDiscount = baseAmount < amount;
  const formatDiscount = new Intl.NumberFormat(locale, { style: "percent" });
  const discount = hasDiscount ? formatDiscount.format((amount - baseAmount) / amount) : null;

  const price = formatPrice({ amount, currencyCode, locale, fractions });
  const basePrice = hasDiscount ? formatPrice({ amount: baseAmount, currencyCode, locale, fractions }) : null;

  return { price, basePrice, discount };
}

interface PriceProps {
  amount: number;
  baseAmount?: number;
  currencyCode?: string;
}

export function usePrice(data?: PriceProps | null) {
  const { currency, currencyOptions } = useSettings();
  const { formation, fractions } = currencyOptions;
  const { amount, baseAmount, currencyCode = currency } = data ?? {};

  const locale = formation ?? siteSettings.defaultLanguage;

  const value = useMemo(() => {
    if (typeof amount !== "number" || !currencyCode) return "";

    return baseAmount
      ? formatVariantPrice({ amount, baseAmount, currencyCode, locale, fractions })
      : formatPrice({ amount, currencyCode, locale, fractions });
  }, [amount, baseAmount, currencyCode]);

  return typeof value === "string" ? { price: value, basePrice: null, discount: null } : value;
}
