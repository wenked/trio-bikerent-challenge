export class BikeNotExistsError extends Error {
  public httpStatus = 404;
  constructor(bikeId: number) {
    super(`Bike with id ${bikeId} not exists`);
    this.name = 'BikeNotExistsError';
  }
}
