export function formatNumber(number: number): string {
  const trillion = 1e12
  const billion = 1e9
  const million = 1e6
  const thousand = 1e3

  if (number >= trillion) {
    return (number / trillion).toFixed(1) + 'T'
  } else if (number >= billion) {
    return (number / billion).toFixed(1) + 'B'
  } else if (number >= million) {
    return (number / million).toFixed(1) + 'M'
  } else if (number >= thousand) {
    return (number / thousand).toFixed(1) + 'K'
  } else {
    return number.toString()
  }
}
