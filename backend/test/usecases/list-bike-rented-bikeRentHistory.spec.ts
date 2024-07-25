import { ListRentedBikeHistoriesByBikeId } from '@/usecases/list-bike-rented-bikeRentHistory';
import { BikeRentHistoryRepository } from '@/usecases/ports/bikeRentHistory-repository';
import { CandidateRepository } from '@/usecases/ports/candidate-repository';
import { BikeBuilder } from '@test/builders/bike-builder';
import { BikeRentHistoryBuilder } from '@test/builders/bikeRentHistory-builder';
import { CandidateBuilder } from '@test/builders/candidate-builder';
import { InMemoryBikeRepository } from '@test/doubles/in-memory-bike-repository';
import { InMemoryBikeRentHistoryRepository } from '@test/doubles/in-memory-bikeRentHistory-repository';
import { InMemoryCandidateRepository } from '@test/doubles/in-memory-candidate-repository';

describe('ListRentedBikeHistoriesByBikeId', () => {
  let useCase: ListRentedBikeHistoriesByBikeId;
  let bikeRentHistoryRepository: BikeRentHistoryRepository;
  let candidateRepository: CandidateRepository;

  it('should return the list of rented bikeRentHistories when the candidate is authorized', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const bikeRentHistoryRepository = new InMemoryBikeRentHistoryRepository();
    const bikeRepository = new InMemoryBikeRepository();

    const candidate = new CandidateBuilder().withToken().withId().build();
    console.log({ candidate });
    const bike = new BikeBuilder().withId().build();
    await bikeRepository.add({ id: bike.id, candidateId: candidate.id, ...bike });
    const addedCandidate = await candidateRepository.add(candidate);

    const bikeRentHistory = new BikeRentHistoryBuilder()
      .withId(1)
      .withBikeId(bike.id)
      .withCandidateId(addedCandidate.id)
      .withStatus('RENTED')
      .build();

    await bikeRentHistoryRepository.add(bikeRentHistory);

    const useCase = new ListRentedBikeHistoriesByBikeId(
      bikeRentHistoryRepository,
      candidateRepository
    );

    const result = await useCase.perform(bike.id, candidate.token);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          bikeId: bike.id,
          candidateId: addedCandidate.id,
          status: 'RENTED',
        }),
      ])
    );
  });
});
