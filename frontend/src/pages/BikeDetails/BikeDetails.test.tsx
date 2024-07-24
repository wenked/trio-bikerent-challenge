import { render, screen } from '@testing-library/react'
import { differenceInDays } from 'date-fns'
import { mockedBike } from 'mocks/Bike'
import { BrowserRouter } from 'react-router-dom'
import BikeDetails from './BikeDetails.component'
import { SERVICE_FEE_PERCENTAGE } from './BikeDetails.contants'
import { formatToMonetaryValue, getBikeTotals, getServicesFee } from './BikeDetails.utils'

describe('BikeDetails page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <BikeDetails bike={mockedBike} />
      </BrowserRouter>,
    )
  })

  it('should has a header', () => {
    const headerElement = screen.getByTestId('header')
    expect(headerElement).toBeInTheDocument()
  })

  it('should has breadcrumbs', () => {
    const breadcrumbsElement = screen.getByTestId('bike-details-breadcrumbs')
    expect(breadcrumbsElement).toBeInTheDocument()
  })

  it('should has the details container with the image selector, bike name, prices and a map', () => {
    const detailsContainerElement = screen.getByTestId('bike-details-container')
    expect(detailsContainerElement).toBeInTheDocument()

    const imageSelectorElement = screen.getByTestId('bike-image-selector')
    expect(imageSelectorElement).toBeInTheDocument()

    const nameElement = screen.getByTestId('bike-name-details')
    expect(nameElement).toBeInTheDocument()

    const pricesElement = screen.getByTestId('bike-prices-details')
    expect(pricesElement).toBeInTheDocument()

    const mapElement = screen.getByTestId('booking-address-map')
    expect(mapElement).toBeInTheDocument()
  })

  it('should has the overview container with the prices, total and booking button', () => {
    const overviewContainerElement = screen.getByTestId('bike-overview-container')
    expect(overviewContainerElement).toBeInTheDocument()

    const pricesElements = screen.getAllByTestId('bike-overview-single-price')
    expect(pricesElements).not.toBeNull()
    expect(pricesElements.length).toBe(2)

    const totalElement = screen.getByTestId('bike-overview-total')
    expect(totalElement).toBeInTheDocument()

    const bookingButtonElement = screen.getByTestId('bike-booking-button')
    expect(bookingButtonElement).toBeInTheDocument()
  })
})

describe('BikeDetails utils', () => {
  it('should gets the services fee properly', () => {
    const amount = 100
    const expectedAmount = amount * SERVICE_FEE_PERCENTAGE

    const result = getServicesFee(amount)
    expect(result).toEqual(expectedAmount)
  })

  describe('formatToMonetaryValue', () => {
    it('should format the price to a monetary value', () => {
      const price = 100
      const expectedFormattedPrice = '100,00\xa0€'

      const formattedPrice = formatToMonetaryValue(price)

      expect(formattedPrice).toBe(expectedFormattedPrice)
    })
  })

  it('should calculate the bike totals correctly', () => {
    const startDate = new Date('2022-01-01')
    const endDate = new Date('2022-01-05')
    const rate = 20
    const rentDays = differenceInDays(endDate, startDate)
    const price = rentDays * rate
    const expectedServicesFee = price * SERVICE_FEE_PERCENTAGE
    const expectedSubtotal = price
    const expectedTotal = price + expectedServicesFee

    const totals = getBikeTotals(startDate, endDate, rate)

    expect(totals.servicesFee).toBe(expectedServicesFee)
    expect(totals.subtotal).toBe(expectedSubtotal)
    expect(totals.total).toBe(expectedTotal)
  })

  it('should handle zero rent days', () => {
    const startDate = new Date('2022-01-01')
    const endDate = new Date('2022-01-01')
    const rate = 20
    const expectedServicesFee = 0
    const expectedSubtotal = 0
    const expectedTotal = 0

    const totals = getBikeTotals(startDate, endDate, rate)

    expect(totals.servicesFee).toBe(expectedServicesFee)
    expect(totals.subtotal).toBe(expectedSubtotal)
    expect(totals.total).toBe(expectedTotal)
  })
})
