import { BikeRentHistoryRepository } from '@/usecases/ports/bikeRentHistory-repository';

import prismaClient from '@/external/repository/prisma/prisma-client';
import { BikeRentHistory } from '@/usecases/datatypes/bikeRentHistory';

export class PrismaBikeRentHistoryRepository implements BikeRentHistoryRepository {
  async add(bikeRentHistory: BikeRentHistory): Promise<BikeRentHistory> {
    const newBikeRentHistory = await prismaClient.bikeRentHistory.create({
      data: {
        status: bikeRentHistory.status,
        rentDate: bikeRentHistory.rentDate,
        returnDate: bikeRentHistory.returnDate,
        cost: bikeRentHistory.cost,
        bike: {
          connect: {
            id: bikeRentHistory.bikeId,
          },
        },
        candidate: {
          connect: {
            id: bikeRentHistory.candidateId,
          },
        },
      },
    });

    return newBikeRentHistory;
  }

  async list(candidateId: number): Promise<BikeRentHistory[]> {
    return await prismaClient.bikeRentHistory.findMany({
      where: {
        candidateId,
      },
    });
  }

  async listRentedBikeHistories(candidateId: number): Promise<BikeRentHistory[]> {
    return await prismaClient.bikeRentHistory.findMany({
      where: {
        candidateId,
        status: 'rented',
        OR: [{ returnDate: null }, { returnDate: { gt: new Date() } }],
      },
    });
  }

  async findRentedByBikeId(bikeId: number): Promise<BikeRentHistory | undefined> {
    return await prismaClient.bikeRentHistory.findFirst({
      where: {
        bikeId,
        status: 'rented',
        OR: [{ returnDate: null }, { returnDate: { gt: new Date() } }],
      },
    });
  }

  async update(bikeRentHistory: BikeRentHistory): Promise<BikeRentHistory> {
    return await prismaClient.bikeRentHistory.update({
      where: {
        id: bikeRentHistory.id,
      },
      data: {
        status: bikeRentHistory.status,
        rentDate: bikeRentHistory.rentDate,
        returnDate: bikeRentHistory.returnDate,
        cost: bikeRentHistory.cost,
      },
    });
  }
}
