import { CreateBikeRentHistory } from '@/usecases/create-bikeRentHistory';
import { BikeBuilder } from '@test/builders/bike-builder';
import { BikeRentHistoryBuilder } from '@test/builders/bikeRentHistory-builder';
import { CandidateBuilder } from '@test/builders/candidate-builder';
import { InMemoryBikeRepository } from '@test/doubles/in-memory-bike-repository';
import { InMemoryBikeRentHistoryRepository } from '@test/doubles/in-memory-bikeRentHistory-repository';
import { InMemoryCandidateRepository } from '@test/doubles/in-memory-candidate-repository';

describe('Create bike rent history use case', () => {
  it('should create a bike rent history', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const bikeRepository = new InMemoryBikeRepository();
    const bikeRentHistoryRepository = new InMemoryBikeRentHistoryRepository();
    const useCase = new CreateBikeRentHistory(
      bikeRentHistoryRepository,
      candidateRepository,
      bikeRepository
    );

    const addedCandidate = new CandidateBuilder().withId().withToken().build();
    const candidate = await candidateRepository.add(addedCandidate);
    const bike = new BikeBuilder().build();
    const addedBike = await bikeRepository.add({ id: 1, candidateId: candidate.id, ...bike });

    const bikeRentHistory = new BikeRentHistoryBuilder()
      .withId(1)
      .withBikeId(addedBike.id)
      .withCandidateId(addedCandidate.id)
      .withRentDate(new Date('2024-07-21 14:00:00'))
      .withReturnDate(new Date('2024-07-25 14:00:00'))
      .build();
    const createdBikeRentHistory = await useCase.perform(bikeRentHistory, addedCandidate.token);

    expect(createdBikeRentHistory.id).toStrictEqual(1);
    expect(createdBikeRentHistory.status).toStrictEqual('RENTED');
    expect(createdBikeRentHistory.rentDate).toStrictEqual(bikeRentHistory.rentDate);
    expect(createdBikeRentHistory.returnDate).toStrictEqual(bikeRentHistory.returnDate);
    expect(createdBikeRentHistory.cost).toStrictEqual(4600);
    expect(createdBikeRentHistory.bikeId).toStrictEqual(addedBike.id);
    expect(createdBikeRentHistory.candidateId).toStrictEqual(candidate.id);
  });
});
