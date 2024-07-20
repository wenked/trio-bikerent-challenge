import { BikeRentHistory } from '@/usecases/datatypes/bikeRentHistory';

export interface BikeRentHistoryRepository {
  list(candidateId: number): Promise<BikeRentHistory[]>;
  listRentedBikeHistories(candidateId: number): Promise<BikeRentHistory[]>;
  add(bikeRentHistory: BikeRentHistory): Promise<BikeRentHistory>;
  update(bikeRentHistory: BikeRentHistory): Promise<BikeRentHistory>;
}
