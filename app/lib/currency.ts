const CURRENCY_FORMATTER = {
  'en-US': new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits: 2
  }),
  'es-AR': new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  })
};

const NUMBER_FORMATTER = {
  'en-US': new Intl.NumberFormat('en-US'),
  'es-ES': new Intl.NumberFormat('es-ES'),
  'es-AR': new Intl.NumberFormat('es-AR')
};

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER['en-US'].format(amount);
}

export function formatCurrencyInCents(amount: number = 0) {
  return CURRENCY_FORMATTER['en-US'].format(amount / 100);
}

export function formatNumber(number: number) {
  return NUMBER_FORMATTER['en-US'].format(number);
}

// removes dot sign due to screen readers compatibility
// @TODO: after checking style and currency number format we need to validate if the replace applies
// @TODO: check if is Argentinian price before replace it
export function accessibilityPrice(price: number): string {
  return formatCurrency(price).replace('.', '').replace('$', '');
}
