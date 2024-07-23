import { Typography } from '@mui/material'
import BikeType from 'components/BikeType'
import Bike from 'models/Bike'
import { BookedBikeContainer, BookedBikeDetail, Name } from './BookedBike.styles'

interface BookedBikeProps {
  bike: Bike
}

const BookedBike = ({ bike }: BookedBikeProps) => {
  console.log({ bike })
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
    </BookedBikeContainer>
  )
}

export default BookedBike
