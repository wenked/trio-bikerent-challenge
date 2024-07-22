import { BikeRentHistory } from '@/usecases/datatypes/bikeRentHistory';

export interface BikeRentHistoryRepository {
  list(candidateId: number): Promise<BikeRentHistory[]>;
  listRentedBikeHistories(candidateId: number): Promise<BikeRentHistory[]>;
  findById(id: number): Promise<BikeRentHistory | undefined>;
  findRentedByBikeId(bikeId: number): Promise<BikeRentHistory | undefined>;
  add(bikeRentHistory: BikeRentHistory): Promise<BikeRentHistory>;
  update(bikeRentHistory: BikeRentHistory): Promise<BikeRentHistory>;
}
