import { SERVICE_FEE_PERCENTAGE } from './BikeDetails.contants'

export const getServicesFee = (amount: number): number => amount * SERVICE_FEE_PERCENTAGE

export const formatToMonetaryValue = (price: number): string => {
  const formatter = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  })
  return formatter.format(price)
}
