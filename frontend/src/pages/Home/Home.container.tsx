import { BOILERPLATE_CANDIDATE_TOKEN } from 'config'
import Bike from 'models/Bike'
import { useEffect, useState } from 'react'

import CustomSnackBar from 'components/CustomSnackBar/CustomSnackBar.component'
import { getAllBikes } from 'services/bikes.service'
import Home from './Home.component'

const HomeContainer = () => {
  const [bikes, setBikes] = useState<Bike[]>([])
  const [error, setError] = useState(false)

  const handleClose = () => {
    setError(false)
  }

  const handleGetAllBikes = async () => {
    try {
      const bikes = await getAllBikes()

      setBikes(bikes)
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  useEffect(() => {
    handleGetAllBikes()
  }, [])

  return (
    <>
      <CustomSnackBar
        open={error}
        onClose={handleClose}
        message='An error occurred while trying to fetch bikes'
        severity='error'
      />
      <Home appIsNotConfigured={!BOILERPLATE_CANDIDATE_TOKEN} bikes={bikes} />
    </>
  )
}

export default HomeContainer
