export class InvalidRentBikePeriodError extends Error {
  public httpStatus = 400;
  constructor() {
    super(`Invalid rent bike period`);
    this.name = 'InvalidRentBikePeriodError';
  }
}
