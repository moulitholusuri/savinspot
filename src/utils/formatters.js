export function formatINR(num) {
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function parsePrice(priceStr) {
  return parseFloat(String(priceStr).replace(/,/g, ''))
}