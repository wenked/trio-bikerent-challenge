import { render, screen } from '@testing-library/react'
import { mockedBike } from 'mocks/Bike'
import BookedBikeModal from './BookedBikeModal.component'

describe('BookedBikeModal component', () => {
  it('should render the modal when open is true', () => {
    render(<BookedBikeModal open={true} bike={mockedBike} onClose={jest.fn()} />)
    const modalElement = screen.getByTestId('booked-bike')
    expect(modalElement).toBeInTheDocument()
  })
})
