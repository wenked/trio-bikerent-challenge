import { Button, ButtonProps, styled } from '@mui/material'

export const SelectDateButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: 20,
  padding: '18px 0',
  marginTop: 12,
  textTransform: 'none',
  backgroundColor: '#FFD775',
  color: theme.palette.common.black,
  fontWeight: 800,

  [theme.breakpoints.down('md')]: {
    marginTop: 0,
  },
}))
