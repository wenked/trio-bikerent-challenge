import { BikeRentHistoryRepository } from '@/usecases/ports/bikeRentHistory-repository';

import prismaClient from '@/external/repository/prisma/prisma-client';
import { BikeRentHistory } from '@/usecases/datatypes/bikeRentHistory';

export class PrismaBikeRentHistoryRepository implements BikeRentHistoryRepository {
  async add(bikeRentHistory: BikeRentHistory): Promise<BikeRentHistory> {
    return await prismaClient.bikeRentHistory.create({
      data: {
        status: bikeRentHistory.status,
        rentDate: bikeRentHistory.rentDate,
        returnDate: bikeRentHistory.returnDate,
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

  async update(bikeRentHistory: BikeRentHistory): Promise<BikeRentHistory> {
    return await prismaClient.bikeRentHistory.update({
      where: {
        id: bikeRentHistory.id,
      },
      data: {
        status: bikeRentHistory.status,
        rentDate: bikeRentHistory.rentDate,
        returnDate: bikeRentHistory.returnDate,
      },
    });
  }
}
