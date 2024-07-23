import { render, screen } from '@testing-library/react'
import { mockedBike } from 'mocks/Bike'
import BookedBike from '.'

describe('BookedBike component', () => {
  beforeEach(() => {
    render(<BookedBike bike={mockedBike} />)
  })

  it('should has the bike type', () => {
    const typeElement = screen.getByTestId('booked-bike')
    expect(typeElement).toBeInTheDocument()
  })
})
