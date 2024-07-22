import { HttpRequest } from '@/presentation/controllers/ports/http-request';
import { HttpResponse } from '@/presentation/controllers/ports/http-response';
import { RentBikeController } from '@/presentation/controllers/rent-bike-controller';
import { RentBike } from '@/usecases/rent-bike';
import { BikeBuilder } from '@test/builders/bike-builder';
import { CandidateBuilder } from '@test/builders/candidate-builder';
import { ErrorThrowingUseCaseStub } from '@test/doubles/error-throwing-use-case-stub';
import { InMemoryBikeRepository } from '@test/doubles/in-memory-bike-repository';
import { InMemoryBikeRentHistoryRepository } from '@test/doubles/in-memory-bikeRentHistory-repository';
import { InMemoryCandidateRepository } from '@test/doubles/in-memory-candidate-repository';

describe('Rent bike controller', () => {
  it('should return 201 if bike is rented successfully', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const bikeRepository = new InMemoryBikeRepository();
    const bikeRentHistoryRepository = new InMemoryBikeRentHistoryRepository();
    const useCase = new RentBike(bikeRentHistoryRepository, candidateRepository, bikeRepository);
    const controller: RentBikeController = new RentBikeController(useCase);

    const addedCandidate = new CandidateBuilder().withId().withToken().build();
    const bikeInfo = new BikeBuilder().build();
    const candidate = await candidateRepository.add(addedCandidate);
    const bike = await bikeRepository.add({
      id: 1,
      candidateId: candidate.id,
      ...bikeInfo,
    });

    const response: HttpResponse = await controller.handle({
      token: candidate.token,
      body: {
        bikeId: bike.id,
        rentDate: '2024-07-22 00:00:00',
        returnDate: '2024-07-23 00:00:00',
        cost: 15,
      },
    } as HttpRequest);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      id: 1,
      candidateId: candidate.id,
      cost: 1150,
      bikeId: bike.id,
      status: 'RENTED',
      rentDate: new Date('2024-07-22 00:00:00'),
      returnDate: new Date('2024-07-23 00:00:00'),
    });
  });

  it('should return 500 if use case raises', async () => {
    const useCasestub = new ErrorThrowingUseCaseStub();
    const controller = new RentBikeController(useCasestub);

    const request: HttpRequest = {
      token: '123456',
      body: {},
    };
    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(500);
  });

  it('should return 401 if user is unauthorized', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const bikeRepository = new InMemoryBikeRepository();
    const bikeRentHistoryRepository = new InMemoryBikeRentHistoryRepository();
    const useCase = new RentBike(bikeRentHistoryRepository, candidateRepository, bikeRepository);
    const controller = new RentBikeController(useCase);

    const request: HttpRequest = {
      token: '123456',
      body: {},
    };
    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(401);
  });

  it('should return 409 if bike is already rented', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const bikeRepository = new InMemoryBikeRepository();
    const bikeRentHistoryRepository = new InMemoryBikeRentHistoryRepository();
    const useCase = new RentBike(bikeRentHistoryRepository, candidateRepository, bikeRepository);
    const controller = new RentBikeController(useCase);

    const addedCandidate = new CandidateBuilder().withId().withToken().build();
    const bikeInfo = new BikeBuilder().build();
    const candidate = await candidateRepository.add(addedCandidate);
    const bike = await bikeRepository.add({
      id: 1,
      candidateId: candidate.id,
      ...bikeInfo,
    });

    await bikeRentHistoryRepository.add({
      bikeId: bike.id,
      candidateId: candidate.id,
      status: 'RENTED',
      rentDate: new Date(),
      returnDate: new Date(),
      cost: 10,
    });

    const response: HttpResponse = await controller.handle({
      token: candidate.token,
      body: {
        bikeId: bike.id,
        rentDate: '2024-07-22 00:00:00',
        returnDate: '2024-07-23 00:00:00',
        cost: 15,
      },
    } as HttpRequest);

    expect(response.statusCode).toEqual(409);
  });
});
