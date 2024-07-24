import { BikeRentHistory } from '@/usecases/datatypes/bikeRentHistory';
import { UnauthorizedError } from '@/usecases/errors/unauthorized-error';
import { ListRentedBikeHistoriesByBikeId } from '@/usecases/list-bike-rented-bikeRentHistory';
import { BikeRentHistoryRepository } from '@/usecases/ports/bikeRentHistory-repository';
import { CandidateRepository } from '@/usecases/ports/candidate-repository';

describe('ListRentedBikeHistoriesByBikeId', () => {
  let useCase: ListRentedBikeHistoriesByBikeId;
  let bikeRentHistoryRepository: BikeRentHistoryRepository;
  let candidateRepository: CandidateRepository;

  beforeEach(() => {
    bikeRentHistoryRepository = {
      listRentedBikeHistoriesByBikeId: jest.fn(),
    } as unknown as BikeRentHistoryRepository;

    candidateRepository = {
      findByToken: jest.fn(),
    } as unknown as CandidateRepository;

    useCase = new ListRentedBikeHistoriesByBikeId(bikeRentHistoryRepository, candidateRepository);
  });

  it('should return the list of rented bikeRentHistories when the candidate is authorized', async () => {
    const bikeId = 1;
    const candidateToken = 'valid_token';

    const candidate = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      token: candidateToken,
    };

    const bikeRentHistories: BikeRentHistory[] = [
      {
        id: 1,
        bikeId: bikeId,
        candidateId: candidate.id,
        status: 'RENTED',
        rentDate: new Date(),
        returnDate: new Date(),
        cost: 10,
      },
    ];

    jest.spyOn(candidateRepository, 'findByToken').mockResolvedValue(candidate);
    jest
      .spyOn(bikeRentHistoryRepository, 'listRentedBikeHistoriesByBikeId')
      .mockResolvedValue(bikeRentHistories);

    const result = await useCase.perform(bikeId, candidateToken);

    expect(candidateRepository.findByToken).toHaveBeenCalledWith(candidateToken);
    expect(bikeRentHistoryRepository.listRentedBikeHistoriesByBikeId).toHaveBeenCalledWith(bikeId);
    expect(result).toEqual(bikeRentHistories);
  });

  it('should throw an UnauthorizedError when the candidate is not authorized', async () => {
    const bikeId = 1;
    const candidateToken = 'invalid_token';

    jest.spyOn(candidateRepository, 'findByToken').mockResolvedValue(null);

    await expect(useCase.perform(bikeId, candidateToken)).rejects.toThrow(UnauthorizedError);
    expect(candidateRepository.findByToken).toHaveBeenCalledWith(candidateToken);
    expect(bikeRentHistoryRepository.listRentedBikeHistoriesByBikeId).not.toHaveBeenCalled();
  });
});
