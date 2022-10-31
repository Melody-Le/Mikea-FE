const CURRENCY_FORMATTER = new Intl.NumberFormat("en-SG", {
  currency: "SGD",
  style: "currency",
});
export function formatCurrency(number) {
  return CURRENCY_FORMATTER.format(number);
}
