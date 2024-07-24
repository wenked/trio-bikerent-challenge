import { Typography } from '@mui/material'
import BikeCard from 'components/BikeCard'
import { BikeDetailsMobileModal } from 'components/BikeDetailsMobileModal/BikeDetailsMobileModal.component'
import Bike from 'models/Bike'
import { useState } from 'react'
import { Container, ListContainer, QuantityContainer } from './BikeList.styles'
import { getQuantityLabel } from './BikeList.utils'

interface BikeListProps {
  bikes: Bike[]
}

const BikeList = ({ bikes }: BikeListProps) => {
  const quantityLabel = getQuantityLabel(bikes.length)
  const [openMobileModal, setOpenMobileModal] = useState(false)
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null)

  const handleOpenBikeDetails = (bike: Bike) => {
    setSelectedBike(bike)
    setOpenMobileModal(true)
  }

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setSelectedBike(open ? selectedBike : null)
    setOpenMobileModal(open)
  }

  return (
    <Container data-testid='bikes-list'>
      <QuantityContainer className='list-quantity-container'>
        <Typography color='primary.light' data-testid='list-quantity'>
          {quantityLabel}
        </Typography>
      </QuantityContainer>

      <ListContainer>
        {bikes.map((bike) => (
          <BikeCard
            key={bike.id}
            bike={bike}
            small={false}
            handleOpenMobileBikeDetails={() => handleOpenBikeDetails(bike)}
          />
        ))}
      </ListContainer>

      {openMobileModal && selectedBike ? (
        <BikeDetailsMobileModal
          open={openMobileModal}
          toggleDrawer={toggleDrawer}
          bike={selectedBike}
        />
      ) : null}
    </Container>
  )
}

export default BikeList
