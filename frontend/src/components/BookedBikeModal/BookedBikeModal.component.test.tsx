import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockedBike } from 'mocks/Bike'
import BookedBikeModal from './BookedBikeModal.component'

describe('BookedBikeModal component', () => {
  it('should render the modal when open is true', () => {
    render(<BookedBikeModal open={true} bike={mockedBike} onClose={jest.fn()} />)
    const modalElement = screen.getByRole('dialog')
    expect(modalElement).toBeInTheDocument()
  })

  it('should not render the modal when open is false', () => {
    render(<BookedBikeModal open={false} bike={mockedBike} onClose={jest.fn()} />)
    const modalElement = screen.queryByRole('dialog')
    expect(modalElement).not.toBeInTheDocument()
  })

  it('should render the BookedBike component with the provided bike prop', () => {
    render(<BookedBikeModal open={true} bike={mockedBike} onClose={jest.fn()} />)
    const bookedBikeElement = screen.getByTestId('booked-bike')
    expect(bookedBikeElement).toBeInTheDocument()
  })

  it('should call the onClose function when the modal is closed', () => {
    const onCloseMock = jest.fn()
    render(<BookedBikeModal open={true} bike={mockedBike} onClose={onCloseMock} />)
    const modalElement = screen.getByRole('dialog')
    userEvent.click(modalElement)
    expect(onCloseMock).toHaveBeenCalled()
  })
})
describe('BookedBikeModal component', () => {
  it('should render the modal when open is true', () => {
    render(<BookedBikeModal open={true} bike={mockedBike} onClose={jest.fn()} />)
    const modalElement = screen.getByRole('dialog')
    expect(modalElement).toBeInTheDocument()
  })

  it('should not render the modal when open is false', () => {
    render(<BookedBikeModal open={false} bike={mockedBike} onClose={jest.fn()} />)
    const modalElement = screen.queryByRole('dialog')
    expect(modalElement).not.toBeInTheDocument()
  })

  it('should render the BookedBike component with the correct props', () => {
    render(<BookedBikeModal open={true} bike={mockedBike} onClose={jest.fn()} />)
    const bookedBikeElement = screen.getByTestId('booked-bike')
    expect(bookedBikeElement).toBeInTheDocument()
    // You can also assert other props of the BookedBike component here
  })

  it('should call the onClose function when the modal is closed', () => {
    const onCloseMock = jest.fn()
    render(<BookedBikeModal open={true} bike={mockedBike} onClose={onCloseMock} />)
    const modalElement = screen.getByRole('dialog')
    userEvent.click(modalElement)
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
})
