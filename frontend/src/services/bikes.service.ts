import Bike from 'models/Bike'
import BikeRentHistory from 'models/BikeRentHistory'
import RentBike from 'models/RentBIke'
import apiClient from './api'

export const getAllBikes = async (): Promise<Bike[]> => {
  const response = await apiClient.get('/bikes')
  return response.data
}

export const getAllAvailableBikes = async (): Promise<Bike[]> => {
  const response = await apiClient.get('/bikes/available')
  return response.data
}

export const getAllRentedBikeHistoriesById = async (id: number): Promise<BikeRentHistory[]> => {
  const response = await apiClient.get(`/bikes/rented/${id}`)
  return response.data
}

export const rentBike = async (data: RentBike): Promise<BikeRentHistory> => {
  const response = await apiClient.post('bikes/rent', data)

  return response.data
}

export const returnBike = async (id: number): Promise<BikeRentHistory> => {
  const response = await apiClient.put('bikes/return', {
    bikeRentHistoryId: id,
  })

  return response.data
}
