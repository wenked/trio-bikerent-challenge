import { BikeRentHistory } from '@/usecases/datatypes/bikeRentHistory';
import { BikeRentHistoryRepository } from '@/usecases/ports/bikeRentHistory-repository';
import { CandidateRepository } from '@/usecases/ports/candidate-repository';

import { BikeNotAvailableError } from './errors/bike-not-available-error';
import { BikeNotExistsError } from './errors/bike-not-exists-error';
import { InvalidRentBikePeriodError } from './errors/invalid-rent-bike-period-error';
import { UnauthorizedError } from './errors/unauthorized-error';
import { BikeRepository } from './ports/bike-repository';

export class RentBike {
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

    if (!bike) throw new BikeNotExistsError(bikeRentHistory.bikeId);

    const existingBikeRentHistory =
      await this.bikeRentHistoryRepository.findRentedByBikeIdAndPeriod(
        bikeRentHistory.bikeId,
        new Date(bikeRentHistory.rentDate),
        new Date(bikeRentHistory.returnDate)
      );

    if (existingBikeRentHistory.length > 0) throw new BikeNotAvailableError(bikeRentHistory.bikeId);

    const returnDate = new Date(bikeRentHistory.returnDate);
    const rentDate = new Date(bikeRentHistory.rentDate);
    console.log({ returnDate, rentDate });
    const rentPeriod = returnDate.getTime() - rentDate.getTime();

    console.log({ rentPeriod });
    const rentPeriodInDays = Math.ceil(rentPeriod / (1000 * 3600 * 24));
    console.log({ rentPeriodInDays });
    const isLessThan24Hours = rentPeriod < 24 * 60 * 60 * 1000;

    if (isLessThan24Hours) throw new InvalidRentBikePeriodError();

    const rentCost = rentPeriodInDays * bike.rate;

    const rentFee = rentCost * 0.15;
    bikeRentHistory.cost = Math.ceil((rentCost + rentFee) * 100); // in cents

    console.log({
      rentCost,
      rentFee,
      cost: bikeRentHistory.cost,
      convertedCost: bikeRentHistory.cost / 100,
    });

    bikeRentHistory.candidateId = candidate.id;
    bikeRentHistory.status = 'RENTED';

    const newBikeRentHistory = await this.bikeRentHistoryRepository.add(bikeRentHistory);
    return newBikeRentHistory;
  }
}
