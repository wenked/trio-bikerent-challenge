export interface BikeRentHistory {
  id?: number;
  bikeId: number;
  candidateId?: number;
  cost: number;
  status: string;
  rentDate: Date;
  returnDate: Date;
}
