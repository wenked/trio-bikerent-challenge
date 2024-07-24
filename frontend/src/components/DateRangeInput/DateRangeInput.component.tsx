import { Box, Typography } from '@mui/material'
import { format } from 'date-fns'
import { CalendarIcon, Content, DateInputContainer } from './DateRangeInput.styles'

interface DateRangeInputProps {
  selectedStartDate?: Date
  selectedEndDate?: Date
  handleToggleCalendar: () => void
}

const DateRangeInput = ({
  selectedEndDate = new Date(),
  selectedStartDate = new Date(),
  handleToggleCalendar,
}: DateRangeInputProps) => {
  return (
    <DateInputContainer data-testid='date-range-input'>
      <div onClick={handleToggleCalendar} data-testid='data-range-input-button'>
        <Typography fontWeight={800} fontSize={24}>
          Select date and time
        </Typography>
        <Content>
          <CalendarIcon />
          <Box display='flex' flexDirection='row' gap={1}>
            <Typography>From</Typography>
            <Typography>{format(selectedStartDate, 'MMM/dd')}</Typography>
          </Box>
          <Box display='flex' flexDirection='row' gap={1} marginRight={10}>
            <Typography>To</Typography>
            <Typography>{format(selectedEndDate, 'MMM/dd')}</Typography>
          </Box>
        </Content>
      </div>
    </DateInputContainer>
  )
}

export default DateRangeInput
