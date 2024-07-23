import { FavoriteBorderOutlined } from '@mui/icons-material'
import { Button, ButtonProps, IconButton, IconButtonProps, styled } from '@mui/material'

export const RentBikeButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: 20,
  padding: '18px 0',
  marginTop: 12,
  textTransform: 'none',
  backgroundColor: '#FFD775',
  color: theme.palette.common.black,
  fontWeight: 800,
}))

export const FavoriteIcon = styled(FavoriteBorderOutlined)(({ theme }) => ({
  color: theme.palette.common.white,
}))

export const LikeButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  border: '1px solid #e3dada4a',
  borderRadius: 20,
  width: 60,
  height: 60,
  fontSize: 16,
}))
