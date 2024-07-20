export interface BikeRentHistory {
  id?: number;
  bikeId: number;
  candidateId: number;
  status: string;
  rentDate: Date;
  returnDate: Date;
}
