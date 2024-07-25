import { isBefore, isWithinInterval, subDays } from 'date-fns'
import BikeRentHistory from 'models/BikeRentHistory'

export const isDayDisabled = (date: Date, rentedBikeHistories: BikeRentHistory[]): boolean => {
  const yesterday = subDays(new Date(), 1)
  const isBeforeYesterday = isBefore(date, yesterday)

  if (isBeforeYesterday) {
    return true
  }

  const isWithinRange = rentedBikeHistories.some((range) => {
    const interval = { start: new Date(range.rentDate), end: new Date(range.returnDate) }
    return isWithinInterval(date, interval)
  })

  return isWithinRange
}
