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
    const date = new Date()
    const rentedBikeHistories: BikeRentHistory[] = [
      {
        id: 1,
        bikeId: 1,
        candidateId: 1,
        cost: 10,
        status: 'RENTED',
        rentDate: new Date('2022-01-01'),
        returnDate: new Date('2022-01-05'),
      },
      {
        id: 2,
        bikeId: 1,
        candidateId: 1,
        cost: 10,
        status: 'RENTED',
        rentDate: new Date('2022-01-10'),
        returnDate: new Date('2022-01-15'),
      },
    ]

    const result = isDayDisabled(date, rentedBikeHistories)

    expect(result).toBe(true)
  })

  it('should return false if the date is not before yesterday and not within any rented bike history range', () => {
    const date = new Date()
    const rentedBikeHistories: BikeRentHistory[] = [
      {
        id: 1,
        bikeId: 1,
        candidateId: 1,
        cost: 10,
        status: 'RENTED',
        rentDate: new Date('2022-01-01'),
        returnDate: new Date('2022-01-05'),
      },
      {
        id: 2,
        bikeId: 1,
        candidateId: 1,
        cost: 10,
        status: 'RENTED',
        rentDate: new Date('2022-01-10'),
        returnDate: new Date('2022-01-15'),
      },
    ]

    const result = isDayDisabled(date, rentedBikeHistories)

    expect(result).toBe(false)
  })
})
