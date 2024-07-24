import { fireEvent, render, screen } from '@testing-library/react'
import DateRangeInput from './DateRangeInput.component'

describe('DateRangeInput component', () => {
  it('should render the component', () => {
    render(
      <DateRangeInput
        handleToggleCalendar={() => {
          // do nothing
        }}
      />,
    )
    const component = screen.getByTestId('date-range-input')
    expect(component).toBeInTheDocument()
  })

  it('should display the selected start and end dates', () => {
    const selectedStartDate = new Date('2024-07-02 03:00:00')
    const selectedEndDate = new Date('2024-07-06 03:00:00')

    render(
      <DateRangeInput
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        handleToggleCalendar={() => {
          // do nothing
        }}
      />,
    )
    const startDateElement = screen.getByText('Jul/02')
    const endDateElement = screen.getByText('Jul/06')
    expect(startDateElement).toBeInTheDocument()
    expect(endDateElement).toBeInTheDocument()
  })

  it('should call handleToggleCalendar when clicked', () => {
    const handleToggleCalendar = jest.fn()
    render(<DateRangeInput handleToggleCalendar={handleToggleCalendar} />)
    const component = screen.getByTestId('data-range-input-button')
    fireEvent.click(component)
    expect(handleToggleCalendar).toHaveBeenCalled()
  })
})
