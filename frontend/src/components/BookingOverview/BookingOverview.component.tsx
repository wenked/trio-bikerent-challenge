import {
  Box,
  CircularProgress,
  Divider,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from '@mui/material'
import BikeCard from 'components/BikeCard'
import CustomDateRangePicker from 'components/CustomDateRangePicker/CustomDateRangePicker.component'
import DateRangeInput from 'components/DateRangeInput/DateRangeInput.component'
import Bike from 'models/Bike'
import BikeRentHistory from 'models/BikeRentHistory'
import {
  BookingButton,
  InfoIcon,
  OverviewContainer,
  PriceRow,
} from 'pages/BikeDetails/BikeDetails.styles'
import { formatToMonetaryValue } from 'pages/BikeDetails/BikeDetails.utils'
import { useEffect, useState } from 'react'
import { Range, RangeKeyDict } from 'react-date-range'
import { getAllRentedBikeHistoriesById } from 'services/bikes.service'
import theme from 'styles/theme'
import { SelectDateButton } from './BookingOverview.styles'

interface BookingOverviewProps {
  bike?: Bike
  selectedRange: Range
  handleDateRangeChange: (ranges: RangeKeyDict) => void
  subtotal: number
  servicesFee: number
  total: number
  handleBikeBooking: () => void
  isLoading: boolean
}

const BookingOverview = ({
  bike,
  selectedRange,
  handleDateRangeChange,
  subtotal,
  servicesFee,
  total,
  handleBikeBooking,
  isLoading,
}: BookingOverviewProps) => {
  const [openCalenar, setOpenCalendar] = useState(false)
  const [rentedIsLoading, setRentedIsLoading] = useState(false)
  const [rentedBikeHistories, setRentedBikeHistories] = useState<BikeRentHistory[]>([])

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const handleToggleCalendar = () => {
    setOpenCalendar(!openCalenar)
  }

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setOpenCalendar(open)
  }

  const handleGetRentedBikeHistories = async () => {
    try {
      if (!bike) return

      setRentedIsLoading(true)
      const histories = await getAllRentedBikeHistoriesById(bike.id)
      setRentedBikeHistories(histories)
      setRentedIsLoading(false)
    } catch (error) {
      console.error(error)
      setRentedIsLoading(false)
    }
  }

  useEffect(() => {
    handleGetRentedBikeHistories()
  }, [bike])

  return (
    <OverviewContainer variant='outlined' data-testid='bike-overview-component'>
      {bike && isMobile ? <BikeCard small={true} bike={bike} /> : null}
      {isMobile ? (
        <DateRangeInput
          selectedEndDate={selectedRange?.endDate}
          selectedStartDate={selectedRange?.startDate}
          handleToggleCalendar={handleToggleCalendar}
        />
      ) : null}

      {isMobile ? null : !rentedIsLoading ? (
        <CustomDateRangePicker
          selectedRange={selectedRange}
          onChange={handleDateRangeChange}
          rentedBikeHistories={rentedBikeHistories}
        />
      ) : (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          marginBottom='50px'
          height='340px'
        >
          <CircularProgress size={80} />
        </Box>
      )}

      <Typography variant='h2' fontSize={16} marginBottom={1.25}>
        Booking Overview
      </Typography>
      <Divider />
      <PriceRow marginTop={1.75} data-testid='bike-overview-single-price'>
        <Box display='flex' alignItems='center'>
          <Typography marginRight={1}>Subtotal</Typography>
          <InfoIcon fontSize='small' />
        </Box>

        <Typography>{formatToMonetaryValue(subtotal)}</Typography>
      </PriceRow>
      <PriceRow marginTop={1.5} data-testid='bike-overview-single-price'>
        <Box display='flex' alignItems='center'>
          <Typography marginRight={1}>Service Fee</Typography>
          <InfoIcon fontSize='small' />
        </Box>

        <Typography>{formatToMonetaryValue(servicesFee)}</Typography>
      </PriceRow>
      <PriceRow marginTop={1.75} data-testid='bike-overview-total'>
        <Typography fontWeight={800} fontSize={16}>
          Total
        </Typography>
        <Typography variant='h2' fontSize={24} letterSpacing={1}>
          {formatToMonetaryValue(total)}
        </Typography>
      </PriceRow>
      <BookingButton
        fullWidth
        disableElevation
        variant='contained'
        data-testid='bike-booking-button'
        onClick={() => handleBikeBooking()}
        disabled={isLoading || rentedIsLoading}
      >
        Add to booking
      </BookingButton>

      {rentedIsLoading ? null : (
        <SwipeableDrawer
          anchor='bottom'
          open={openCalenar}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          PaperProps={{ sx: { borderRadius: '30px 30px 0 0', backgroundColor: '#1F49D1' } }}
        >
          <CustomDateRangePicker
            rentedBikeHistories={rentedBikeHistories}
            selectedRange={selectedRange}
            onChange={handleDateRangeChange}
          />
          <div
            style={{
              padding: '0 20px 20px',
            }}
          >
            <SelectDateButton
              fullWidth
              disableElevation
              variant='contained'
              data-testid='mobile-select-date-button'
              onClick={toggleDrawer(false)}
            >
              Select
            </SelectDateButton>
          </div>
        </SwipeableDrawer>
      )}
    </OverviewContainer>
  )
}

export default BookingOverview
