import { BikeRentHistory } from '@/usecases/datatypes/bikeRentHistory';
import { BikeRentHistoryRepository } from '@/usecases/ports/bikeRentHistory-repository';
import { RentedBikeNotFoundError } from './errors/rented-bike-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';
import { CandidateRepository } from './ports/candidate-repository';

export class ReturnBike {
  constructor(
    private bikeRentHistoryRepository: BikeRentHistoryRepository,
    private readonly candidateRepository: CandidateRepository
  ) {}

  async perform(id: number, candidateToken: string): Promise<BikeRentHistory> {
    const candidate = await this.candidateRepository.findByToken(candidateToken);

    console.log({ candidate });
    if (!candidate) throw new UnauthorizedError();

    const bikeRentHistory = await this.bikeRentHistoryRepository.findById(id);

    if (!bikeRentHistory) throw new RentedBikeNotFoundError();

    if (bikeRentHistory.candidateId !== candidate.id) throw new UnauthorizedError();

    const updatedBikeRentHistory = await this.bikeRentHistoryRepository.update({
      id: bikeRentHistory.id,
      status: 'RETURNED',
    });

    return updatedBikeRentHistory;
  }
}
