import { differenceInDays } from 'date-fns'
import { SERVICE_FEE_PERCENTAGE } from './BikeDetails.contants'

export const getServicesFee = (amount: number): number => amount * SERVICE_FEE_PERCENTAGE

export const formatToMonetaryValue = (price: number): string => {
  const formatter = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  })
  return formatter.format(price)
}

export const getBikeTotals = (
  startDate: Date,
  endDate: Date,
  rate: number,
): {
  servicesFee: number
  subtotal: number
  total: number
} => {
  const rentDays = differenceInDays(endDate, startDate)

  const price = rentDays * rate || 0

  const subtotal = price
  const servicesFee = getServicesFee(price)

  const total = price + servicesFee

  return {
    servicesFee,
    subtotal,
    total,
  }
}
