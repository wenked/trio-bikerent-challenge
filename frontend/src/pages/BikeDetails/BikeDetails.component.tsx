import { Box, Breadcrumbs, Divider, Link, Typography } from '@mui/material'
import BikeImageSelector from 'components/BikeImageSelector'
import BikeSpecs from 'components/BikeSpecs'
import BikeType from 'components/BikeType'
import BookingAddressMap from 'components/BookingAddressMap'
import CustomDateRangePicker from 'components/CustomDateRangePicker/CustomDateRangePicker.component'
import Header from 'components/Header'
import Bike from 'models/Bike'
import { useState } from 'react'

import BookedBike from 'components/BookedBike/BookedBike.component'
import CustomSnackBar from 'components/CustomSnackBar/CustomSnackBar.component'
import { differenceInDays } from 'date-fns'
import { Range, RangeKeyDict } from 'react-date-range'
import { rentBike } from 'services/bikes.service'
import {
  BookingButton,
  BreadcrumbContainer,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Content,
  DetailsContainer,
  FavoriteIcon,
  InfoIcon,
  LikeButton,
  OverviewContainer,
  PriceRow,
} from './BikeDetails.styles'
import { formatToMonetaryValue, getServicesFee } from './BikeDetails.utils'

interface BikeDetailsProps {
  bike?: Bike
}

const BikeDetails = ({ bike }: BikeDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const [bookedBike, setBookedBike] = useState(false)
  const [selectedRange, setSelectedRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })

  const [servicesFee, setServicesFee] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [total, setTotal] = useState(0)

  const handleCloseSnackBar = () => {
    setError(false)
  }

  const handleDateRangeChange = (ranges: RangeKeyDict) => {
    console.log({ range: ranges.selection })
    if (ranges.selection.startDate && ranges.selection.endDate && bike) {
      const rentDays = differenceInDays(ranges.selection.endDate, ranges.selection.startDate)

      const price = rentDays * bike.rate || 0

      setSubtotal(price)
      const fee = getServicesFee(price)
      setServicesFee(fee)

      const total = price + fee
      console.log({ price, fee, total })
      setTotal(total)
      console.log({ rentDays })

      setSelectedRange(ranges.selection)
    }
  }

  const handleBikeBooking = async () => {
    try {
      if (!bike) return

      if (!selectedRange.startDate || !selectedRange.endDate) return

      setIsLoading(true)

      await rentBike({
        bikeId: bike.id,
        rentDate: selectedRange.startDate,
        returnDate: selectedRange.endDate,
      })

      setIsLoading(false)
      setBookedBike(true)
    } catch (error) {
      console.error(error)
      setError(true)
      setIsLoading(false)
    }
  }

  const rateByDay = formatToMonetaryValue(bike?.rate || 0)
  const rateByWeek = formatToMonetaryValue((bike?.rate || 0) * 7)

  return (
    <div data-testid='bike-details-page'>
      <Header />
      <CustomSnackBar
        open={error}
        onClose={handleCloseSnackBar}
        message='An error occurred while trying to booking the bike'
        severity='error'
      />

      <BreadcrumbContainer data-testid='bike-details-breadcrumbs'>
        <Breadcrumbs separator={<BreadcrumbSeparator />}>
          <Link underline='hover' display='flex' alignItems='center' color='white' href='/'>
            <BreadcrumbHome />
          </Link>

          <Typography fontWeight={800} letterSpacing={1} color='white'>
            {bike?.name}
          </Typography>
        </Breadcrumbs>
      </BreadcrumbContainer>

      <Content>
        <DetailsContainer variant='outlined' data-testid='bike-details-container'>
          {!!bike?.imageUrls && <BikeImageSelector imageUrls={bike.imageUrls} />}

          <BikeSpecs bodySize={bike?.bodySize} maxLoad={bike?.maxLoad} ratings={bike?.ratings} />

          <Divider />

          <Box marginY={2.25}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
              <div>
                <Typography
                  variant='h1'
                  fontSize={38}
                  fontWeight={800}
                  marginBottom={0.5}
                  data-testid='bike-name-details'
                >
                  {bike?.name}
                </Typography>

                <BikeType type={bike?.type} />
              </div>

              <LikeButton>
                <FavoriteIcon />
              </LikeButton>
            </Box>

            <Typography marginTop={1.5} fontSize={14}>
              {bike?.description}
            </Typography>
          </Box>

          <Divider />

          <Box marginY={2.25} data-testid='bike-prices-details'>
            <PriceRow>
              <Typography>Day</Typography>
              <Typography fontWeight={800} fontSize={24} letterSpacing={1}>
                {rateByDay}
              </Typography>
            </PriceRow>

            <PriceRow>
              <Typography>Week</Typography>
              <Typography fontWeight={800} fontSize={24} letterSpacing={1}>
                {rateByWeek}
              </Typography>
            </PriceRow>
          </Box>

          <Divider />

          <Box marginTop={3.25}>
            <Typography variant='h1' fontSize={24} fontWeight={800}>
              Full adress after booking
            </Typography>

            <BookingAddressMap />
          </Box>
        </DetailsContainer>

        {bookedBike && bike ? (
          <BookedBike bike={bike} />
        ) : (
          <OverviewContainer variant='outlined' data-testid='bike-overview-container'>
            <CustomDateRangePicker selectedRange={selectedRange} onChange={handleDateRangeChange} />
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
              disabled={isLoading}
            >
              Add to booking
            </BookingButton>
          </OverviewContainer>
        )}
      </Content>
    </div>
  )
}

export default BikeDetails
