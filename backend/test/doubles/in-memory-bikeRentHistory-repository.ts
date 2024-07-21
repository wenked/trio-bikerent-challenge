import { BikeRentHistory } from '@/usecases/datatypes/bikeRentHistory';
import { BikeRentHistoryRepository } from '@/usecases/ports/bikeRentHistory-repository';

export class InMemoryBikeRentHistoryRepository implements BikeRentHistoryRepository {
  private bikeRentHistories: BikeRentHistory[] = [];

  async list(candidateId: number): Promise<BikeRentHistory[]> {
    return this.bikeRentHistories.filter(
      (bikeRentHistory) => bikeRentHistory.candidateId === candidateId
    );
  }

  async listRentedBikeHistories(candidateId: number): Promise<BikeRentHistory[]> {
    return this.bikeRentHistories.filter(
      (bikeRentHistory) =>
        bikeRentHistory.candidateId === candidateId && bikeRentHistory.status === 'RENTED'
    );
  }

  async findRentedByBikeId(bikeId: number): Promise<BikeRentHistory | undefined> {
    return this.bikeRentHistories.find(
      (bikeRentHistory) => bikeRentHistory.bikeId === bikeId && bikeRentHistory.status === 'RENTED'
    );
  }

  async add(bikeRentHistory: BikeRentHistory): Promise<BikeRentHistory> {
    const newBikeRentHistory = {
      ...bikeRentHistory,
      id: this.bikeRentHistories.length + 1,
      returnDate: new Date(bikeRentHistory.returnDate),
      rentDate: new Date(bikeRentHistory.rentDate),
    };
    this.bikeRentHistories.push(newBikeRentHistory);
    return newBikeRentHistory;
  }

  async update(bikeRentHistory: BikeRentHistory): Promise<BikeRentHistory> {
    const bikeHistoryIndex = this.bikeRentHistories.findIndex(
      (item) => item.id === bikeRentHistory.id
    );

    if (bikeHistoryIndex === -1) throw new Error('BikeRentHistory does not exist');

    const bikeHistoryExists = this.bikeRentHistories[bikeHistoryIndex];

    if (bikeRentHistory?.status) {
      bikeHistoryExists.status = bikeRentHistory.status;
    }

    if (bikeRentHistory?.returnDate) {
      bikeHistoryExists.returnDate = bikeRentHistory.returnDate;
    }

    if (bikeRentHistory?.rentDate) {
      bikeHistoryExists.rentDate = bikeRentHistory.rentDate;
    }

    if (bikeRentHistory?.cost) {
      bikeHistoryExists.cost = bikeRentHistory.cost;
    }

    this.bikeRentHistories[bikeHistoryIndex] = bikeHistoryExists;

    return bikeHistoryExists;
  }
}
