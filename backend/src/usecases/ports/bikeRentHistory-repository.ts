import { BikeRentHistory } from '@/usecases/datatypes/bikeRentHistory';

export interface BikeRentHistoryRepository {
  list(candidateId: number): Promise<BikeRentHistory[]>;
  listRentedBikeHistories(candidateId: number): Promise<BikeRentHistory[]>;
  listRentedBikeHistoriesByBikeId(bikeId: number): Promise<BikeRentHistory[]>;
  findById(id: number): Promise<BikeRentHistory | undefined>;
  findRentedByBikeIdAndPeriod(
    bikeId: number,
    rentDate: Date,
    returnDate: Date
  ): Promise<BikeRentHistory[] | undefined>;
  add(bikeRentHistory: BikeRentHistory): Promise<BikeRentHistory>;
  update(bikeRentHistory: BikeRentHistory): Promise<BikeRentHistory>;
}
