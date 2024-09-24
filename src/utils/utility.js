export const PAGE_HEIGHT_FIX =
  "size-full min-h-[calc(100dvh-2.25rem)] rounded-[2rem]";

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
    // No decimal places
    minimumFractionDigits: 0,
    // No decimal places
    maximumFractionDigits: 0,
  });
  return formatter.format(price);
}

export function formatWithDecimalZero(value) {
  return value % 1 === 0 ? `${value}.0` : value.toFixed(1);
}

export function formatDate(date) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return new Date(date).toLocaleDateString("en-GB", options);
}
