import { Typography, useMediaQuery } from '@mui/material'
import BikeType from 'components/BikeType'
import { GoToHomePageButton } from 'components/BookedBikeModal/BookedBikeModal.styles'
import Bike from 'models/Bike'
import { useNavigate } from 'react-router-dom'
import theme from 'styles/theme'
import { BookedBikeContainer, BookedBikeDetail, Name } from './BookedBike.styles'

interface BookedBikeProps {
  bike: Bike
}

const BookedBike = ({ bike }: BookedBikeProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

  const handleGoToHomePage = () => {
    navigate('/')
  }

  return (
    <BookedBikeContainer data-testid='booked-bike'>
      <Typography fontWeight={800} fontSize={24} letterSpacing={1}>
        Thank you!
      </Typography>
      <Typography fontWeight={600} fontSize={16} letterSpacing={1}>
        Your bike is booked.
      </Typography>

      <BookedBikeDetail>
        <img src={bike.imageUrls[0]} width='100%' alt='Bike Placeholder Image' />
        <Name data-testid='bike-name'>{bike.name}</Name>
        <BikeType type={bike.type} />
      </BookedBikeDetail>
      {isMobile ? (
        <GoToHomePageButton
          fullWidth
          disableElevation
          variant='contained'
          data-testid='bike-booking-button'
          onClick={() => handleGoToHomePage()}
        >
          Go to home page
        </GoToHomePageButton>
      ) : null}
    </BookedBikeContainer>
  )
}

export default BookedBike
