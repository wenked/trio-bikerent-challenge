import { Controller } from '@/presentation/controllers/ports';
import { RentBikeController } from '@/presentation/controllers/rent-bike-controller';
import { CreateBikeRentHistory } from '@/usecases/create-bikeRentHistory';
import { makeBikeRentHistoryRepository } from './make-bikeRentHistory-repository';
import { makeCandidateRepository } from './make-candidate-repository';

export const makeRentBikeController = (): Controller => {
  const bikeRentHistoryRepository = makeBikeRentHistoryRepository();
  const candidateRepository = makeCandidateRepository();
  const useCase = new CreateBikeRentHistory(bikeRentHistoryRepository, candidateRepository);

  const rentBikeController = new RentBikeController(useCase);

  return rentBikeController;
};
