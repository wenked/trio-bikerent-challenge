import { render, screen } from '@testing-library/react'
import CustomSnackBar from './CustomSnackBar.component'

describe('CustomSnackBar component', () => {
  const onCloseMock = jest.fn()

  beforeEach(() => {
    render(
      <CustomSnackBar
        message='Test message'
        open={true}
        onClose={onCloseMock}
        severity='success'
      />,
    )
  })

  it('should render the message', () => {
    const messageElement = screen.getByText('Test message')
    expect(messageElement).toBeInTheDocument()
  })
})
