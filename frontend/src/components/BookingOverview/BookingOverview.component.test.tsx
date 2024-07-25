import { render, screen } from '@testing-library/react'
import { mockedBike } from 'mocks/Bike'
import BookingOverview from './BookingOverview.component'

describe('BookingOverview component', () => {
  const selectedRange = {
    startDate: new Date('2022-01-01 03:00:00'),
    endDate: new Date('2022-01-03 03:00:00'),
  }

  const handleDateRangeChange = jest.fn()
  const handleBikeBooking = jest.fn()

  beforeEach(() => {
    render(
      <BookingOverview
        bike={mockedBike}
        selectedRange={selectedRange}
        handleDateRangeChange={handleDateRangeChange}
        subtotal={100}
        servicesFee={10}
        total={110}
        handleBikeBooking={handleBikeBooking}
        isLoading={false}
      />,
    )
  })

  it('should render the  Booking Overview text', () => {
    const bookingOverviewText = screen.getByText(/Booking Overview/i)
    expect(bookingOverviewText).toBeInTheDocument()
  })
})
