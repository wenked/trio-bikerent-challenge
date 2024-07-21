export interface BikeRentHistory {
  id?: number;
  bikeId?: number;
  candidateId?: number;
  cost?: number;
  status?: 'RENTED' | 'RETURNED';
  rentDate?: Date;
  returnDate?: Date;
}
