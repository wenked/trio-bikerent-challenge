import { subDays } from 'date-fns'
import BikeRentHistory from 'models/BikeRentHistory'
import { isDayDisabled } from './CustomDateRangePicker.utils'

describe('isDayDisabled', () => {
  it('should return true if the date is before yesterday', () => {
    const date = subDays(new Date(), 2)
    const rentedBikeHistories: BikeRentHistory[] = []

    const result = isDayDisabled(date, rentedBikeHistories)

    expect(result).toBe(true)
  })

  it('should return true if the date is within any rented bike history range', () => {
    const date = new Date('2024-11-17 04:00:00')
    const rentedBikeHistories: BikeRentHistory[] = [
      {
        id: 1,
        bikeId: 1,
        candidateId: 1,
        cost: 10,
        status: 'RENTED',
        rentDate: new Date('2024-11-10 04:00:00'),
        returnDate: new Date('2024-11-20 04:00:00'),
      },
      {
        id: 2,
        bikeId: 1,
        candidateId: 1,
        cost: 10,
        status: 'RENTED',
        rentDate: new Date('2024-12-12 04:00:00'),
        returnDate: new Date('2024-12-14 04:00:00'),
      },
    ]

    const result = isDayDisabled(date, rentedBikeHistories)

    expect(result).toBe(true)
  })

  it('should return false if the date is not before yesterday and not within any rented bike history range', () => {
    const date = new Date('2024-12-17 04:00:00')
    const rentedBikeHistories: BikeRentHistory[] = [
      {
        id: 1,
        bikeId: 1,
        candidateId: 1,
        cost: 10,
        status: 'RENTED',
        rentDate: new Date('2024-12-01 04:00:00'),
        returnDate: new Date('2024-12-03 04:00:00'),
      },
      {
        id: 2,
        bikeId: 1,
        candidateId: 1,
        cost: 10,
        status: 'RENTED',
        rentDate: new Date('2024-11-12 04:00:00'),
        returnDate: new Date('2024-11-15 04:00:00'),
      },
    ]

    const result = isDayDisabled(date, rentedBikeHistories)

    expect(result).toBe(false)
  })
})
