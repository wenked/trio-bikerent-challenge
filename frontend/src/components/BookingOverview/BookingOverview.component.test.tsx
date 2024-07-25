import { fireEvent, render, screen } from '@testing-library/react'
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

  it('should render the bike card', () => {
    const bikeCardElement = screen.getByTestId('bike-card')
    expect(bikeCardElement).toBeInTheDocument()
  })

  it('should render the date range input', () => {
    const dateRangeInputElement = screen.getByTestId('date-range-input')
    expect(dateRangeInputElement).toBeInTheDocument()
  })

  it('should render the subtotal', () => {
    const subtotalElement = screen.getByText('Subtotal')
    expect(subtotalElement).toBeInTheDocument()
  })

  it('should render the service fee', () => {
    const serviceFeeElement = screen.getByText('Service Fee')
    expect(serviceFeeElement).toBeInTheDocument()
  })

  it('should render the total', () => {
    const totalElement = screen.getByText('Total')
    expect(totalElement).toBeInTheDocument()
  })

  it('should render the booking button', () => {
    const bookingButtonElement = screen.getByTestId('bike-booking-button')
    expect(bookingButtonElement).toBeInTheDocument()
  })

  it('should call handleBikeBooking when the booking button is clicked', () => {
    const bookingButtonElement = screen.getByTestId('bike-booking-button')
    fireEvent.click(bookingButtonElement)
    expect(handleBikeBooking).toHaveBeenCalled()
  })
})
