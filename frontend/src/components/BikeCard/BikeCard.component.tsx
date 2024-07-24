import { Box, Divider, IconButton, Typography } from '@mui/material'
import BikePlaceholder from 'assets/bike-placeholder.png'
import BikeType from 'components/BikeType'
import Bike from 'models/Bike'
import {
  BikeImage,
  Container,
  FavoriteIcon,
  Footer,
  Header,
  ImageContainer,
  MobileContainer,
  Name,
  PriceText,
} from './BikeCard.styles'

type JustDisplayedBikeData = Omit<Bike, 'candidateId' | 'maxLoad' | 'ratings'>

interface BikeCardComponentProps extends JustDisplayedBikeData {
  isImageLoaded: boolean
  cardImage: string
  handleOpenBikeDetails: () => void
  handleIsImageLoaded: (isLoading: boolean) => void
  small: boolean
}

const BikeCard = ({
  isImageLoaded,
  name,
  cardImage,
  type,
  rate,
  handleOpenBikeDetails,
  handleIsImageLoaded,
  small,
}: BikeCardComponentProps) => {
  const LikeButton = (
    <IconButton>
      <FavoriteIcon />
    </IconButton>
  )

  if (small) {
    return (
      <MobileContainer variant='outlined' data-testid='mobile-bike-card'>
        <Box width={90} display='flex' justifyContent='center' alignItems='center'>
          {!isImageLoaded && (
            <img
              src={BikePlaceholder}
              width='100%'
              alt='Bike Placeholder Image'
              placeholder={BikePlaceholder}
            />
          )}

          <BikeImage
            src={cardImage}
            isLoaded={isImageLoaded}
            width='100%'
            alt='Bike Image'
            data-testid='bike-image'
            onLoadStart={() => handleIsImageLoaded(false)}
            onLoad={() => handleIsImageLoaded(true)}
          />
        </Box>

        <Box display='flex' flexDirection='column' gap={1} marginLeft={2}>
          {' '}
          <Typography fontSize={18} fontWeight={800} data-testid='bike-name'>
            {name}
          </Typography>
          <BikeType type={type} />
          <Typography fontSize={14} letterSpacing={1} data-testid='bike-price-day'>
            <Typography fontSize={14} fontWeight={600} component={'span'}>
              {rate} €/
            </Typography>
            Day
          </Typography>
        </Box>
      </MobileContainer>
    )
  }

  return (
    <Container variant='outlined' data-testid='bike-card'>
      <Header action={LikeButton} />

      <div onClick={handleOpenBikeDetails}>
        <ImageContainer>
          {!isImageLoaded && (
            <img
              src={BikePlaceholder}
              width='100%'
              alt='Bike Placeholder Image'
              placeholder={BikePlaceholder}
            />
          )}

          <BikeImage
            src={cardImage}
            isLoaded={isImageLoaded}
            width='100%'
            alt='Bike Image'
            data-testid='bike-image'
            onLoadStart={() => handleIsImageLoaded(false)}
            onLoad={() => handleIsImageLoaded(true)}
          />
        </ImageContainer>

        <Name data-testid='bike-name'>{name}</Name>

        <Divider />

        <Footer
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          data-testid='card-footer'
        >
          <BikeType type={type} />

          <Typography letterSpacing={1} data-testid='bike-price-day'>
            <PriceText component={'span'}>{rate} €/</PriceText>
            Day
          </Typography>
        </Footer>
      </div>
    </Container>
  )
}

export default BikeCard
