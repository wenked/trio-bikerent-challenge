import { PrismaBikeRentHistoryRepository } from '@/external/repository/prisma/prisma-bikeRentHistory-repository';
import { BikeRentHistoryRepository } from '@/usecases/ports/bikeRentHistory-repository';

export const makeBikeRentHistoryRepository = (): BikeRentHistoryRepository => {
  return new PrismaBikeRentHistoryRepository();
};
