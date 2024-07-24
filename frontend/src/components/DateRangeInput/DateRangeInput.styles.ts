import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { Box, BoxProps, Container, styled } from '@mui/material'

export const Content = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderRadius: 20,
  border: `1px solid ${theme.palette.grey[500]}`,
  color: theme.palette.common.black,
  padding: 16,
  gap: 4,
  width: '100%',
}))

export const DateInputContainer = styled(Container)<BoxProps>(() => ({
  marginTop: 20,
  marginBottom: 20,
  padding: 0,
}))

export const CalendarIcon = styled(CalendarMonthOutlinedIcon)(() => ({
  color: '#1F49D1',
}))
