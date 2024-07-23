import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import BikePlaceholder from 'assets/bike-placeholder.png'
import BikeImageList from 'components/BikeImageList'
import Carousel from 'react-material-ui-carousel'
import { BikeImage, Container } from './BikeImageSelector.styles'

interface BikeImageSelectorComponentProps {
  selectedImageUrl: string
  selectedImageIndex: number
  imageUrls: string[]
  isImageLoaded: boolean
  handleSelectImage: (imageUrl: string, index: number) => void
  handleIsImageLoaded: (newStatus: boolean) => void
}

const BikeImageSelector = ({
  selectedImageUrl,
  selectedImageIndex,
  imageUrls,
  isImageLoaded,
  handleIsImageLoaded,
  handleSelectImage,
}: BikeImageSelectorComponentProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Container data-testid='bike-image-selector'>
      {isMobile ? (
        <Carousel>
          {imageUrls.map((imageUrl, index) => {
            const imageUniqueId = `${imageUrl}-${index}`
            return (
              <BikeImage
                isLoaded={isImageLoaded}
                key={imageUniqueId}
                src={imageUrl}
                width='100%'
                height='100%'
                alt="Bigger bike's image"
                data-testid='bike-selected-image'
                onLoadStart={() => handleIsImageLoaded(false)}
                onLoad={() => handleIsImageLoaded(true)}
              />
            )
          })}
        </Carousel>
      ) : (
        <>
          <BikeImageList
            selectedImageUrl={selectedImageUrl}
            selectedImageIndex={selectedImageIndex}
            imageUrls={imageUrls}
            handleSelectImage={handleSelectImage}
          />
          {!isImageLoaded && (
            <img
              src={BikePlaceholder}
              width='100%'
              height='100%'
              alt="Bigger bike's image Placeholder"
            />
          )}

          <BikeImage
            isLoaded={isImageLoaded}
            key={selectedImageUrl}
            src={selectedImageUrl}
            width='100%'
            height='100%'
            alt="Bigger bike's image"
            data-testid='bike-selected-image'
            onLoadStart={() => handleIsImageLoaded(false)}
            onLoad={() => handleIsImageLoaded(true)}
          />
        </>
      )}
    </Container>
  )
}

export default BikeImageSelector
