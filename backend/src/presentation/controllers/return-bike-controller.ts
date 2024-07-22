import { Controller, HttpRequest } from '@/presentation/controllers/ports';
import { UseCase } from '@/usecases/ports/use-case';

export class ReturnBikeController implements Controller {
  constructor(private readonly useCase: UseCase) {}

  async handle(request: HttpRequest): Promise<any> {
    try {
      const bikeRentHistoryId = request.body.bikeRentHistoryId;
      const bikeRentHistory = await this.useCase.perform(bikeRentHistoryId, request.token);
      return {
        statusCode: 200,
        body: bikeRentHistory,
      };
    } catch (error) {
      console.error(error);
      const bikeNotAvailable = error.constructor.name === 'RentedBikeNotFoundError';
      const userUnauthorized = error.constructor.name === 'UnauthorizedError';

      if (bikeNotAvailable || userUnauthorized) {
        return {
          statusCode: error.httpStatus,
          body: {
            errorType: error.constructor.name,
            message: error.message,
          },
        };
      }

      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
