import { Alert, Snackbar } from '@mui/material'

interface CustomSnackBarProps {
  message: string
  open: boolean
  onClose: () => void
  severity: 'error' | 'warning' | 'info' | 'success'
}

const CustomSnackBar = ({ message, open, onClose, severity }: CustomSnackBarProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={onClose}
      key={`${message}`}
      autoHideDuration={6000}
      data-testid='custom-snackbar'
    >
      <Alert onClose={onClose} severity={severity} variant='filled' sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default CustomSnackBar
