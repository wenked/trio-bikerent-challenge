export class BikeIsRentedError extends Error {
  public httpStatus = 409;
  constructor(bikeId: number) {
    super(`Bike with id ${bikeId} is already rented`);
    this.name = 'BikeIsRentedError';
  }
}
