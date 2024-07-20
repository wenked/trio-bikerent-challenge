export class BikeNotAvailableError extends Error {
  public httpStatus = 409;
  constructor(bikeId: number) {
    super(`Bike with id ${bikeId} is already rented`);
    this.name = 'BikeNotAvailableError';
  }
}
