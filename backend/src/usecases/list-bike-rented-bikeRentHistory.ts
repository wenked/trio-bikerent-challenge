import { BikeRentHistory } from './datatypes/bikeRentHistory';
import { UnauthorizedError } from './errors/unauthorized-error';
import { BikeRentHistoryRepository } from './ports/bikeRentHistory-repository';
import { CandidateRepository } from './ports/candidate-repository';
import { UseCase } from './ports/use-case';

export class ListRentedBikeHistoriesByBikeId implements UseCase {
  constructor(
    private bikeRentHistoryRepository: BikeRentHistoryRepository,
    private candidateRepository: CandidateRepository
  ) {}

  async perform(bikeId: number, candidateToken: string): Promise<BikeRentHistory[]> {
    const candidate = await this.candidateRepository.findByToken(candidateToken);
    if (!candidate) throw new UnauthorizedError();

    const bikeRentHistories = await this.bikeRentHistoryRepository.listRentedBikeHistoriesByBikeId(
      bikeId
    );

    return bikeRentHistories;
  }
}
