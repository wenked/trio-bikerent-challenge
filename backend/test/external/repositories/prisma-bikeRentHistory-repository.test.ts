import { PrismaBikeRepository } from '@/external/repository/prisma/prisma-bike-repository';
import { PrismaBikeRentHistoryRepository } from '@/external/repository/prisma/prisma-bikeRentHistory-repository';
import { PrismaCandidateRepository } from '@/external/repository/prisma/prisma-candidate-repository';
import { BikeBuilder } from '@test/builders/bike-builder';
import { clearPrismaDatabase } from '@test/main/routes/clear-database';

describe('BikeRentHistory prisma repository', () => {
  it('should be able to list bikeRentHistories', async () => {
    await clearPrismaDatabase();

    const candidateRepo = new PrismaCandidateRepository();
    const bikeRepo = new PrismaBikeRepository();
    const bikeRentHistoryRepo = new PrismaBikeRentHistoryRepository();

    const candidate = await candidateRepo.add({
      name: 'any_name',
      email: 'any_email',
      token: 'any_token',
    });

    const bikeInfo = new BikeBuilder().build();

    const bike = await bikeRepo.add({
      candidateId: candidate.id,
      ...bikeInfo,
    });

    await bikeRentHistoryRepo.add({
      bikeId: bike.id,
      candidateId: candidate.id,
      status: 'RENTED',
      rentDate: new Date(),
      returnDate: new Date(),
      cost: 10,
    });

    const bikeRentHistories = await bikeRentHistoryRepo.list(candidate.id);

    expect(bikeRentHistories.length).toBe(1);
    expect(bikeRentHistories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          bikeId: bike.id,
          candidateId: candidate.id,
          status: 'RENTED',
          cost: 10,
        }),
      ])
    );
  });

  it('should be able to list rented bikeRentHistories', async () => {
    await clearPrismaDatabase();

    const candidateRepo = new PrismaCandidateRepository();
    const bikeRepo = new PrismaBikeRepository();
    const bikeRentHistoryRepo = new PrismaBikeRentHistoryRepository();

    const candidate = await candidateRepo.add({
      name: 'any_name',
      email: 'any_email',
      token: 'any_token',
    });

    const bikeInfo = new BikeBuilder().build();

    const bike = await bikeRepo.add({
      candidateId: candidate.id,
      ...bikeInfo,
    });

    await bikeRentHistoryRepo.add({
      bikeId: bike.id,
      candidateId: candidate.id,
      status: 'RENTED',
      rentDate: new Date(),
      returnDate: new Date(),
      cost: 10,
    });

    const bikeRentHistories = await bikeRentHistoryRepo.listRentedBikeHistories(candidate.id);

    expect(bikeRentHistories.length).toBe(1);
    expect(bikeRentHistories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          bikeId: bike.id,
          candidateId: candidate.id,
          status: 'RENTED',
          cost: 10,
        }),
      ])
    );
  });

  it('should be able to find rented bikeRentHistory by bikeId', async () => {
    await clearPrismaDatabase();

    const candidateRepo = new PrismaCandidateRepository();
    const bikeRepo = new PrismaBikeRepository();
    const bikeRentHistoryRepo = new PrismaBikeRentHistoryRepository();

    const candidate = await candidateRepo.add({
      name: 'any_name',
      email: 'any_email',
      token: 'any_token',
    });

    const bikeInfo = new BikeBuilder().build();

    const bike = await bikeRepo.add({
      candidateId: candidate.id,
      ...bikeInfo,
    });

    await bikeRentHistoryRepo.add({
      bikeId: bike.id,
      candidateId: candidate.id,
      status: 'RENTED',
      rentDate: new Date(),
      returnDate: new Date(),
      cost: 10,
    });

    const bikeRentHistory = await bikeRentHistoryRepo.findRentedByBikeId(bike.id);

    expect(bikeRentHistory).toEqual(
      expect.objectContaining({
        bikeId: bike.id,
        candidateId: candidate.id,
        status: 'RENTED',
        cost: 10,
      })
    );
  });

  it('should be able to update bikeRentHistory', async () => {
    await clearPrismaDatabase();

    const candidateRepo = new PrismaCandidateRepository();
    const bikeRepo = new PrismaBikeRepository();
    const bikeRentHistoryRepo = new PrismaBikeRentHistoryRepository();

    const candidate = await candidateRepo.add({
      name: 'any_name',
      email: 'any_email',
      token: 'any_token',
    });

    const bikeInfo = new BikeBuilder().build();

    const bike = await bikeRepo.add({
      candidateId: candidate.id,
      ...bikeInfo,
    });

    const bikeRentHistory = await bikeRentHistoryRepo.add({
      bikeId: bike.id,
      candidateId: candidate.id,
      status: 'RENTED',
      rentDate: new Date(),
      returnDate: new Date(),
      cost: 10,
    });

    const updatedBikeRentHistory = await bikeRentHistoryRepo.update({
      id: bikeRentHistory.id,
      status: 'RETURNED',
    });

    expect(updatedBikeRentHistory).toEqual(
      expect.objectContaining({
        id: bikeRentHistory.id,
        status: 'RETURNED',
      })
    );
  });

  it('shoud be able to create a bikeRentHistory', async () => {
    await clearPrismaDatabase();

    const candidateRepo = new PrismaCandidateRepository();
    const bikeRepo = new PrismaBikeRepository();
    const bikeRentHistoryRepo = new PrismaBikeRentHistoryRepository();

    const candidate = await candidateRepo.add({
      name: 'any_name',
      email: 'any_email',
      token: 'any_token',
    });

    const bikeInfo = new BikeBuilder().build();

    const bike = await bikeRepo.add({
      candidateId: candidate.id,
      ...bikeInfo,
    });

    const bikeRentHistory = await bikeRentHistoryRepo.add({
      bikeId: bike.id,
      candidateId: candidate.id,
      status: 'RENTED',
      rentDate: new Date(),
      returnDate: new Date(),
      cost: 10,
    });

    expect(bikeRentHistory).toEqual(
      expect.objectContaining({
        bikeId: bike.id,
        candidateId: candidate.id,
        status: 'RENTED',
        cost: 10,
      })
    );
  });
});