import { isBefore, subDays } from 'date-fns'

import { DateRange, Range, RangeKeyDict } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { CustomDateRangePickerContainer } from './CustomDateRangePicker.styles'

interface CustomDateRangePickerProps {
  onChange: (ranges: RangeKeyDict) => void
  selectedRange: Range
}

const isPastToday = (date: Date) => {
  const yesterday = subDays(new Date(), 1)
  return isBefore(date, yesterday)
}
const CustomDateRangePicker = ({ onChange, selectedRange }: CustomDateRangePickerProps) => {
  return (
    <CustomDateRangePickerContainer>
      <DateRange
        showDateDisplay={false}
        ranges={[selectedRange]}
        onChange={onChange}
        disabledDay={isPastToday}
      />
    </CustomDateRangePickerContainer>
  )
}

export default CustomDateRangePicker
