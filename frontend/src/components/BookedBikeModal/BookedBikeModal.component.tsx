import { Modal } from '@mui/material'
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
      open={open}
      onClose={onClose}
      aria-labelledby='parent-modal-title'
      aria-describedby='parent-modal-description'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <BookedBike bike={bike} />
    </Modal>
  )
}

export default BookedBikeModal
