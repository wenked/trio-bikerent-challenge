import { Card, CardProps, styled, Typography, TypographyProps } from '@mui/material'
import { Box } from '@mui/system'

export const Name = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.common.black,
  fontSize: 18,
  fontWeight: 800,
  marginTop: 22,
}))

export const BookedBikeContainer = styled(Card)<CardProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 20,
  borderColor: theme.palette.grey[500],
  padding: 34,
  maxHeight: 400,

  [theme.breakpoints.down('md')]: {
    width: '85vw',
    maxHeight: '65vh',
  },
}))

export const BookedBikeDetail = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '185px',
}))
