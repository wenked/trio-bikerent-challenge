import { Container } from './BikeImageList.styles'
import ImageToSelect from './components/ImageToSelect'

interface BikeImageSelectorComponentProps {
  selectedImageUrl: string
  selectedImageIndex: number
  imageUrls: string[]
  handleSelectImage: (imageUrl: string, index: number) => void
}

const BikeImageSelector = ({
  selectedImageUrl,
  selectedImageIndex,
  imageUrls,
  handleSelectImage,
}: BikeImageSelectorComponentProps) => {
  return (
    <Container data-testid='bike-images-list'>
      {imageUrls.map((imageUrl, index) => {
        const imageUniqueId = `${imageUrl}-${index}`
        const isSelected = imageUrl === selectedImageUrl && index === selectedImageIndex

        return (
          <ImageToSelect
            key={imageUniqueId}
            imageUrl={imageUrl}
            index={index}
            isSelected={isSelected}
            handleSelectImage={handleSelectImage}
          />
        )
      })}
    </Container>
  )
}

export default BikeImageSelector
