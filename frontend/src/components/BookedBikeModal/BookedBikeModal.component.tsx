import { Box, Modal } from '@mui/material'
import BookedBike from 'components/BookedBike/BookedBike.component'
import Bike from 'models/Bike'

interface BookedBikeModalProps {
  open: boolean
  bike: Bike
  onClose: () => void
}

const BookedBikeModal = ({ open, bike, onClose }: BookedBikeModalProps) => {
  return (
    <Modal
      data-testid='booked-bike-modal'
      open={open}
      onClose={() => onClose()}
      aria-labelledby='parent-modal-title'
      aria-describedby='parent-modal-description'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box>
        <BookedBike bike={bike} />
      </Box>
    </Modal>
  )
}

export default BookedBikeModal
