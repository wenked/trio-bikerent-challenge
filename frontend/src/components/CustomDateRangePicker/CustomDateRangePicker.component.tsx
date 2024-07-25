import BikeRentHistory from 'models/BikeRentHistory'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { CustomDateRangePickerContainer } from './CustomDateRangePicker.styles'
import { isDayDisabled } from './CustomDateRangePicker.utils'

interface CustomDateRangePickerProps {
  onChange: (ranges: RangeKeyDict) => void
  rentedBikeHistories: BikeRentHistory[]
  selectedRange: Range
}

const CustomDateRangePicker = ({
  onChange,
  selectedRange,
  rentedBikeHistories,
}: CustomDateRangePickerProps) => {
  return (
    <CustomDateRangePickerContainer>
      <DateRange
        showDateDisplay={false}
        ranges={[selectedRange]}
        onChange={onChange}
        disabledDay={(date) => isDayDisabled(date, rentedBikeHistories)}
      />
    </CustomDateRangePickerContainer>
  )
}

export default CustomDateRangePicker
