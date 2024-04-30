export function getFormattedPrice(price: number | number): string {
  let intPrice = price;

  if (typeof intPrice === 'string') {
    intPrice = parseInt(intPrice);
  }

  if (typeof price !== 'number') {
    intPrice = 0;
  }

  // Format the price above to USD using the locale, style, and currency.
  // let USDollar = new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: 'USD',
  // });
  let PesARG = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  });

  // return USDollar.format(price);
  // replace dot sign
  return PesARG.format(intPrice);
}

// removes dot sign due to screen readers compatibility
// @TODO: after checking style and currency number format we need to validate if the replace applies
export function accessibilityPrice(price: number | string): string {
  const formattedPrice = getFormattedPrice(price);
  // @TODO check if is Argentinian before replace it
  return formattedPrice.replace('.', '').replace('$', '');
}
