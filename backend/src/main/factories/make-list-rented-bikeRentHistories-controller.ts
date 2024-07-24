import { ListRentedBikeRentHistoriesByIdController } from '@/presentation/controllers/list-rented-bikeRentHistories-by-bike-id';
import { Controller } from '@/presentation/controllers/ports/controller';
import { ListRentedBikeHistoriesByBikeId } from '@/usecases/list-bike-rented-bikeRentHistory';
import { makeBikeRentHistoryRepository } from './make-bikeRentHistory-repository';
import { makeCandidateRepository } from './make-candidate-repository';

export const makeListRentedBikeRentHitoriesByIdController = (): Controller => {
  const bikeRentHistoryRepository = makeBikeRentHistoryRepository();
  const candidateRepository = makeCandidateRepository();
  const useCase = new ListRentedBikeHistoriesByBikeId(
    bikeRentHistoryRepository,
    candidateRepository
  );
  const createCourseController = new ListRentedBikeRentHistoriesByIdController(useCase);
  return createCourseController;
};
