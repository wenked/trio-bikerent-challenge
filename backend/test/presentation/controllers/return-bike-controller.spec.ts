import { HttpRequest, HttpResponse } from '@/presentation/controllers/ports';
import { ReturnBikeController } from '@/presentation/controllers/return-bike-controller';
import { ReturnBike } from '@/usecases/return-bike';
import { BikeRentHistoryBuilder } from '@test/builders/bikeRentHistory-builder';
import { CandidateBuilder } from '@test/builders/candidate-builder';
import { ErrorThrowingUseCaseStub } from '@test/doubles/error-throwing-use-case-stub';
import { InMemoryBikeRentHistoryRepository } from '@test/doubles/in-memory-bikeRentHistory-repository';
import { InMemoryCandidateRepository } from '@test/doubles/in-memory-candidate-repository';

describe('Return bike controller', () => {
  it('shoud return 200 if bike is returned', async () => {
    const bikeRentHistoryRepository = new InMemoryBikeRentHistoryRepository();
    const candidateRepository = new InMemoryCandidateRepository();
    const useCase = new ReturnBike(bikeRentHistoryRepository, candidateRepository);
    const controller = new ReturnBikeController(useCase);

    const candidate = new CandidateBuilder().withId().withToken().build();
    const candidateAdded = await candidateRepository.add(candidate);

    const bikeRentHistory = new BikeRentHistoryBuilder()
      .withId(1)
      .withCandidateId(candidateAdded.id)
      .withBikeId(1)
      .withRentDate(new Date('2024-07-22 00:00:00'))
      .withReturnDate(new Date('2024-07-23 00:00:00'))
      .withStatus('RENTED')
      .build();
    const bikeRentHistoryAdded = await bikeRentHistoryRepository.add(bikeRentHistory);

    const response: HttpResponse = await controller.handle({
      token: candidateAdded.token,
      body: {
        bikeRentHistoryId: bikeRentHistoryAdded.id,
      },
    } as HttpRequest);

    expect(response.statusCode).toEqual(200);
  });

  it('should return 404 if bikeRentHistory is not found', async () => {
    const bikeRentHistoryRepository = new InMemoryBikeRentHistoryRepository();
    const candidateRepository = new InMemoryCandidateRepository();
    const useCase = new ReturnBike(bikeRentHistoryRepository, candidateRepository);
    const controller = new ReturnBikeController(useCase);

    const candidate = new CandidateBuilder().withId().withToken().build();
    const candidateAdded = await candidateRepository.add(candidate);

    const response: HttpResponse = await controller.handle({
      token: candidateAdded.token,
      body: {
        bikeRentHistoryId: 1,
      },
    } as HttpRequest);

    expect(response.statusCode).toEqual(404);
  });

  it('should return 500 if use case raises', async () => {
    const useCase = new ErrorThrowingUseCaseStub();
    const controller = new ReturnBikeController(useCase);

    const request: HttpRequest = {
      token: '123456',
      body: {},
    };
    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(500);
  });

  it('should return 401 if user is unauthorized', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const bikeRentHistoryRepository = new InMemoryBikeRentHistoryRepository();
    const useCase = new ReturnBike(bikeRentHistoryRepository, candidateRepository);
    const controller = new ReturnBikeController(useCase);

    const request: HttpRequest = {
      token: '123456',
      body: {
        bikeRentHistoryId: 1,
      },
    } as HttpRequest;
    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(401);
  });

  it('shoud return 401 if user is not authorized to return the bike', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const bikeRentHistoryRepository = new InMemoryBikeRentHistoryRepository();
    const useCase = new ReturnBike(bikeRentHistoryRepository, candidateRepository);
    const controller = new ReturnBikeController(useCase);

    const candidate = new CandidateBuilder().withId().withToken().build();
    await candidateRepository.add(candidate);

    const differentCandidate = new CandidateBuilder().withId(2).withToken().build();
    const differentCandidateAdded = await candidateRepository.add(differentCandidate);

    const bikeRentHistory = new BikeRentHistoryBuilder()
      .withId(1)
      .withCandidateId(differentCandidateAdded.id)
      .withBikeId(1)
      .withRentDate(new Date('2024-07-22 00:00:00'))
      .withReturnDate(new Date('2024-07-23 00:00:00'))
      .withStatus('RENTED')
      .build();
    const bikeRentHistoryAdded = await bikeRentHistoryRepository.add(bikeRentHistory);

    const response: HttpResponse = await controller.handle({
      token: candidate.token,
      body: {
        bikeRentHistoryId: bikeRentHistoryAdded.id,
      },
    } as HttpRequest);

    expect(response.statusCode).toEqual(401);
  });
});
