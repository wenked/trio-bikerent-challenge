export class RentedBikeNotFoundError extends Error {
  public httpStatus = 404;
  constructor() {
    super(`Rented bike not found`);
    this.name = 'RentedBikeNotFoundError';
  }
}
