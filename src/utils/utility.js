export function formatCurrency(price) {
  const formater = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formater.format(price);
}

export function formatCurrencyNoDecimals(price) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0, // No decimal places
    maximumFractionDigits: 0, // No decimal places
  });
  return formatter.format(price);
}

export function formatWithDecimalZero(value) {
  return value % 1 === 0 ? `${value}.0` : value.toFixed(1);
}

export const PAGE_HEIGHT_FIX = "size-full min-h-[calc(100dvh-2.25rem)]";