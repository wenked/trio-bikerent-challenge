import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Bike from 'models/Bike'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paths } from 'routes/paths'
import BikeCard from './BikeCard.component'

interface BikeCardProps {
  bike: Bike
  handleOpenMobileBikeDetails?: () => void
  small: boolean
}

const BikeCardContainer = ({ bike, handleOpenMobileBikeDetails, small }: BikeCardProps) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleOpenBikeDetails = () => {
    if (isMobile && handleOpenMobileBikeDetails) {
      handleOpenMobileBikeDetails()
      return
    }

    navigate(Paths.BIKE_DETAILS, { state: { bike } })
  }

  const handleIsImageLoaded = (isLoading: boolean) => {
    setIsImageLoaded(isLoading)
  }

  return (
    <BikeCard
      id={bike.id}
      isImageLoaded={isImageLoaded}
      handleIsImageLoaded={handleIsImageLoaded}
      handleOpenBikeDetails={handleOpenBikeDetails}
      name={bike.name}
      type={bike.type}
      bodySize={bike.bodySize}
      description={bike.description}
      imageUrls={bike.imageUrls}
      cardImage={bike.imageUrls[0] || ''}
      rate={bike.rate}
      small={small}
    />
  )
}

export default BikeCardContainer
