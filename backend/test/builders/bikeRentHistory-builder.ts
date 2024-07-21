import { BikeRentHistory } from '@/usecases/datatypes/bikeRentHistory';

export class BikeRentHistoryBuilder {
  private bikeRentHistory: BikeRentHistory = {};

  withId(id: number): BikeRentHistoryBuilder {
    this.bikeRentHistory.id = id;
    return this;
  }

  withBikeId(bikeId: number): BikeRentHistoryBuilder {
    this.bikeRentHistory.bikeId = bikeId;
    return this;
  }

  withCandidateId(candidateId: number): BikeRentHistoryBuilder {
    this.bikeRentHistory.candidateId = candidateId;
    return this;
  }

  withCost(cost: number): BikeRentHistoryBuilder {
    this.bikeRentHistory.cost = cost;
    return this;
  }

  withStatus(status: 'RENTED' | 'RETURNED'): BikeRentHistoryBuilder {
    this.bikeRentHistory.status = status;
    return this;
  }

  withRentDate(rentDate: Date): BikeRentHistoryBuilder {
    this.bikeRentHistory.rentDate = rentDate;
    return this;
  }

  withReturnDate(returnDate: Date): BikeRentHistoryBuilder {
    this.bikeRentHistory.returnDate = returnDate;
    return this;
  }

  build(): BikeRentHistory {
    return this.bikeRentHistory;
  }
}
