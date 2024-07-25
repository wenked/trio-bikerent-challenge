import { Box, Divider, SwipeableDrawer, Typography } from '@mui/material'
import { BikeImage } from 'components/BikeCard/BikeCard.styles'
import BikeSpecs from 'components/BikeSpecs'
import BikeType from 'components/BikeType'
import BookingAddressMap from 'components/BookingAddressMap'
import Bike from 'models/Bike'
import { PriceRow } from 'pages/BikeDetails/BikeDetails.styles'
import { formatToMonetaryValue } from 'pages/BikeDetails/BikeDetails.utils'
import Carousel from 'react-material-ui-carousel'
import { useNavigate } from 'react-router-dom'
import { Paths } from 'routes/paths'
import { FavoriteIcon, LikeButton, RentBikeButton } from './BikeDetailsMobileModal.styles'

interface BikeDetailsMobileModalProps {
  bike: Bike
  open: boolean
  toggleDrawer: (open: boolean) => React.ReactEventHandler
}

const BikeDetailsMobileModal = ({ bike, open, toggleDrawer }: BikeDetailsMobileModalProps) => {
  const navigate = useNavigate()

  const handleOpenBookingDetails = () => {
    navigate(Paths.BIKE_DETAILS, { state: { bike } })
  }

  const rateByDay = formatToMonetaryValue(bike?.rate || 0)
  const rateByWeek = formatToMonetaryValue((bike?.rate || 0) * 7)
  return (
    <>
      <SwipeableDrawer
        anchor='bottom'
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        PaperProps={{ sx: { borderRadius: '30px 30px 0 0' } }}
      >
        <Box sx={{ width: 'auto', position: 'relative', height: '90vh' }} role='presentation'>
          <Carousel
            sx={{
              padding: '1rem',
            }}
          >
            {bike.imageUrls.map((imageUrl, index) => {
              const imageUniqueId = `${imageUrl}-${index}`
              return (
                <BikeImage
                  isLoaded={true}
                  key={imageUniqueId}
                  src={imageUrl}
                  width='100%'
                  height='100%'
                  alt="Bigger bike's image"
                  data-testid='bike-selected-image'
                />
              )
            })}
          </Carousel>

          <Box
            sx={{
              borderRadius: '30px',
              width: '100%',
              padding: '16px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <BikeSpecs bodySize={bike?.bodySize} maxLoad={bike?.maxLoad} ratings={bike?.ratings} />
          </Box>

          <Box
            sx={{
              borderRadius: '30px 30px 0 0',
              backgroundColor: '#1F49D1',
              color: 'white',
              width: '100%',
              position: 'absolute',
              top: '352px',
              height: 'max-content',
              padding: '64px 16px 16px 16px',
            }}
          >
            <Box marginY={2.25}>
              <Box display='flex' alignItems='center' justifyContent='space-between'>
                <div>
                  <Typography
                    variant='h1'
                    fontSize={24}
                    fontWeight={800}
                    marginBottom={0.5}
                    data-testid='bike-name-details'
                  >
                    {bike?.name}
                  </Typography>

                  <BikeType type={bike?.type} />
                </div>
              </Box>

              <Typography marginTop={1.5} fontSize={14}>
                {bike?.description}
              </Typography>

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

              <Divider />
              <Box gap={1} display={'flex'} flexDirection={'row'} marginTop={2}>
                <LikeButton
                  sx={{
                    marginTop: '16px',
                  }}
                >
                  <FavoriteIcon />
                </LikeButton>
                <RentBikeButton
                  fullWidth
                  disableElevation
                  variant='contained'
                  data-testid='mobile-bike-booking-button'
                  onClick={() => handleOpenBookingDetails()}
                  // disabled={isLoading}
                >
                  Rent Bike
                </RentBikeButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  )
}

export default BikeDetailsMobileModal
