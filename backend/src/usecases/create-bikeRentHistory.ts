import { BikeRentHistory } from '@/usecases/datatypes/bikeRentHistory';
import { BikeRentHistoryRepository } from '@/usecases/ports/bikeRentHistory-repository';
import { CandidateRepository } from '@/usecases/ports/candidate-repository';

import { BikeNotAvailableError } from './errors/bike-not-available-error';
import { UnauthorizedError } from './errors/unauthorized-error';
import { BikeRepository } from './ports/bike-repository';

export class CreateBikeRentHistory {
  constructor(
    private readonly bikeRentHistoryRepository: BikeRentHistoryRepository,
    private readonly candidateRepository: CandidateRepository,
    private readonly bikeRepository: BikeRepository
  ) {}

  async perform(
    bikeRentHistory: BikeRentHistory,
    candidateToken: string
  ): Promise<BikeRentHistory> {
    console.log({ bikeRentHistory, candidateToken });
    const candidate = await this.candidateRepository.findByToken(candidateToken);

    console.log({ candidate });
    if (!candidate) throw new UnauthorizedError();

    const bike = await this.bikeRepository.findById(bikeRentHistory.bikeId);

    if (!bike) throw new BikeNotAvailableError(bikeRentHistory.bikeId);

    const existingBikeRentHistory = await this.bikeRentHistoryRepository.findRentedByBikeId(
      bikeRentHistory.bikeId
    );
    console.log({ existingBikeRentHistory });

    if (existingBikeRentHistory) throw new BikeNotAvailableError(bikeRentHistory.bikeId);

    const returnDate = new Date(bikeRentHistory.returnDate);
    const rentDate = new Date(bikeRentHistory.rentDate);
    const rentPeriod = returnDate.getTime() - rentDate.getTime();

    const rentPeriodInDays = Math.ceil(rentPeriod / (1000 * 3600 * 24));
    console.log({ rentPeriodInDays });

    const rentCost = rentPeriodInDays * bike.rate;
    const rentFee = rentCost * 0.15;
    bikeRentHistory.cost = Math.ceil((rentCost + rentFee) * 100); // in cents

    console.log({ rentCost, rentFee, cost: bikeRentHistory.cost });

    bikeRentHistory.candidateId = candidate.id;
    bikeRentHistory.status = 'RENTED';

    const newBikeRentHistory = await this.bikeRentHistoryRepository.add(bikeRentHistory);
    return newBikeRentHistory;
  }
}
