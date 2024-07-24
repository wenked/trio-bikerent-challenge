import { Box, Breadcrumbs, Divider, Link, Typography, useMediaQuery } from '@mui/material'
import BikeImageSelector from 'components/BikeImageSelector'
import BikeSpecs from 'components/BikeSpecs'
import BikeType from 'components/BikeType'
import BookingAddressMap from 'components/BookingAddressMap'
import Header from 'components/Header'
import Bike from 'models/Bike'
import { useState } from 'react'

import BookedBike from 'components/BookedBike/BookedBike.component'
import BookedBikeModal from 'components/BookedBikeModal/BookedBikeModal.component'
import BookingOverview from 'components/BookingOverview/BookingOverview.component'
import CustomSnackBar from 'components/CustomSnackBar/CustomSnackBar.component'
import { MobileBookingHeader } from 'components/Header/layouts'
import { differenceInDays } from 'date-fns'
import { Range, RangeKeyDict } from 'react-date-range'
import { useNavigate } from 'react-router-dom'
import { rentBike } from 'services/bikes.service'
import theme from 'styles/theme'
import {
  BackButton,
  BackIcon,
  BookingContainer,
  BreadcrumbContainer,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Content,
  DetailsContainer,
  FavoriteIcon,
  LikeButton,
  PriceRow,
} from './BikeDetails.styles'
import { formatToMonetaryValue, getServicesFee } from './BikeDetails.utils'

interface BikeDetailsProps {
  bike?: Bike
}

const BikeDetails = ({ bike }: BikeDetailsProps) => {
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
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
    if (ranges.selection.startDate && ranges.selection.endDate && bike) {
      const rentDays = differenceInDays(ranges.selection.endDate, ranges.selection.startDate)

      const price = rentDays * bike.rate || 0

      setSubtotal(price)
      const fee = getServicesFee(price)
      setServicesFee(fee)

      const total = price + fee

      setTotal(total)

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

  const handleGoBackHome = () => {
    navigate('/')
  }

  const rateByDay = formatToMonetaryValue(bike?.rate || 0)
  const rateByWeek = formatToMonetaryValue((bike?.rate || 0) * 7)

  return (
    <div data-testid='bike-details-page'>
      {isMobile ? <MobileBookingHeader /> : <Header />}

      <CustomSnackBar
        open={error}
        onClose={handleCloseSnackBar}
        message='An error occurred while trying to booking the bike'
        severity='error'
      />

      {isMobile ? (
        <BookingContainer>
          <Box gap={5} display='flex' flexDirection='row' alignItems='center' width='100%'>
            <BackButton onClick={handleGoBackHome}>
              <BackIcon />
            </BackButton>
            <Typography fontWeight={800} fontSize={34} letterSpacing={1} color='black'>
              Booking
            </Typography>
          </Box>
        </BookingContainer>
      ) : (
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
      )}

      <Content>
        {isMobile ? null : (
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
        )}

        {bookedBike && bike && !isMobile ? (
          <BookedBike bike={bike} />
        ) : (
          <BookingOverview
            bike={bike}
            selectedRange={selectedRange}
            handleDateRangeChange={handleDateRangeChange}
            subtotal={subtotal}
            servicesFee={servicesFee}
            total={total}
            handleBikeBooking={handleBikeBooking}
            isLoading={isLoading}
          />
        )}
        {bike && isMobile && bookedBike ? (
          <BookedBikeModal bike={bike} open={bookedBike} onClose={() => setBookedBike(false)} />
        ) : null}
      </Content>
    </div>
  )
}

export default BikeDetails
