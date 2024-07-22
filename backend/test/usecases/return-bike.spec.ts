import { ReturnBike } from '@/usecases/return-bike';
import { BikeBuilder } from '@test/builders/bike-builder';
import { BikeRentHistoryBuilder } from '@test/builders/bikeRentHistory-builder';
import { CandidateBuilder } from '@test/builders/candidate-builder';
import { InMemoryBikeRepository } from '@test/doubles/in-memory-bike-repository';
import { InMemoryBikeRentHistoryRepository } from '@test/doubles/in-memory-bikeRentHistory-repository';
import { InMemoryCandidateRepository } from '@test/doubles/in-memory-candidate-repository';

describe('Return bike use case', () => {
  it('shoudld update bike rent history status to RETURNED', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const bikeRepository = new InMemoryBikeRepository();
    const bikeRentHistoryRepository = new InMemoryBikeRentHistoryRepository();
    const useCase = new ReturnBike(bikeRentHistoryRepository, candidateRepository);

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

    await bikeRentHistoryRepository.add(bikeRentHistory);

    await useCase.perform(bikeRentHistory.id, addedCandidate.token);

    const updatedBikeRentHistory = await bikeRentHistoryRepository.findById(1);
    expect(updatedBikeRentHistory.status).toStrictEqual('RETURNED');
  });
});
