const formatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
});

export default function formatCurrency(ammount) {
  return formatter.format(ammount);
}
