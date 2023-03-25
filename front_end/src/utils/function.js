export const formatCurrency = (number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND'
  })

  return formatter.format(number);
}

export const formatMultiCurrency = (value1, value2) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND'
  })

  if (value2 > 0) {
    return `${formatter.format(value1)} - ${formatter.format(value2)}`
  } else {
    return `${formatter.format(value1)}`
  }
}