import { Controller } from '@/presentation/controllers/ports';

import { makeBikeRentHistoryRepository } from '@/main/factories/make-bikeRentHistory-repository';
import { makeCandidateRepository } from '@/main/factories/make-candidate-repository';
import { ReturnBikeController } from '@/presentation/controllers/return-bike-controller';
import { ReturnBike } from '@/usecases/return-bike';

export const makeReturnBikeController = (): Controller => {
  const bikeRentHistoryRepository = makeBikeRentHistoryRepository();
  const candidateRepository = makeCandidateRepository();
  const useCase = new ReturnBike(bikeRentHistoryRepository, candidateRepository);

  const rentBikeController = new ReturnBikeController(useCase);

  return rentBikeController;
};
