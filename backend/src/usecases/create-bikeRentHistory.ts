import { BikeRentHistory } from '@/usecases/datatypes/bikeRentHistory';
import { BikeRentHistoryRepository } from '@/usecases/ports/bikeRentHistory-repository';
import { CandidateRepository } from '@/usecases/ports/candidate-repository';

import { BikeNotAvailableError } from './errors/bike-not-available-error';
import { UnauthorizedError } from './errors/unauthorized-error';

export class CreateBikeRentHistory {
  constructor(
    private readonly bikeRentHistoryRepository: BikeRentHistoryRepository,
    private readonly candidateRepository: CandidateRepository
  ) {}

  async perform(
    bikeRentHistory: BikeRentHistory,
    candidateToken: string
  ): Promise<BikeRentHistory> {
    const candidate = await this.candidateRepository.findByToken(candidateToken);
    if (!candidate) throw new UnauthorizedError();

    const existingBikeRentHistory = await this.bikeRentHistoryRepository.findRentedByBikeId(
      bikeRentHistory.bikeId
    );

    if (existingBikeRentHistory) throw new BikeNotAvailableError(bikeRentHistory.bikeId);

    bikeRentHistory.candidateId = candidate.id;

    const newBikeRentHistory = await this.bikeRentHistoryRepository.add(bikeRentHistory);
    return newBikeRentHistory;
  }
}
