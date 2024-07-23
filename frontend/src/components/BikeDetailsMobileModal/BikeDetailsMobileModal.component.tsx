import { Box, SwipeableDrawer, Typography } from '@mui/material'
import { BikeImage } from 'components/BikeCard/BikeCard.styles'
import BikeSpecs from 'components/BikeSpecs'
import Bike from 'models/Bike'
import Carousel from 'react-material-ui-carousel'

interface BikeDetailsMobileModalProps {
  bike: Bike
  open: boolean
  toggleDrawer: (open: boolean) => React.ReactEventHandler
}

export const BikeDetailsMobileModal = ({
  bike,
  open,
  toggleDrawer,
}: BikeDetailsMobileModalProps) => {
  console.log({ open })
  return (
    <>
      <SwipeableDrawer
        anchor='bottom'
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        PaperProps={{ sx: { borderRadius: '30px 30px 0 0' } }}
      >
        <Box
          sx={{ width: 'auto', position: 'relative', height: '90vh' }}
          role='presentation'
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
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
              height: '100%',
              padding: '64px 16px 16px 16px',
            }}
          >
            <Typography id='bike-details-modal-title' variant='h6' component='h2'>
              {bike.name}
            </Typography>
            <Typography id='bike-details-modal-description' sx={{ mt: 2 }}>
              {bike.description}
            </Typography>
            {/* Add more bike details here */}
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
