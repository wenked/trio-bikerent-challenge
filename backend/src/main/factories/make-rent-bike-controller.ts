import { makeBikeRepository } from '@/main/factories/make-bike-repository';
import { Controller } from '@/presentation/controllers/ports';
import { RentBikeController } from '@/presentation/controllers/rent-bike-controller';
import { RentBike } from '@/usecases/rent-bike';

import { makeBikeRentHistoryRepository } from '@/main/factories/make-bikeRentHistory-repository';
import { makeCandidateRepository } from '@/main/factories/make-candidate-repository';

export const makeRentBikeController = (): Controller => {
  const bikeRentHistoryRepository = makeBikeRentHistoryRepository();
  const candidateRepository = makeCandidateRepository();
  const bikeRepository = makeBikeRepository();
  const useCase = new RentBike(bikeRentHistoryRepository, candidateRepository, bikeRepository);

  const rentBikeController = new RentBikeController(useCase);

  return rentBikeController;
};
