import { Controller } from '@/presentation/controllers/ports/controller';
import { HttpRequest } from '@/presentation/controllers/ports/http-request';
import { HttpResponse } from '@/presentation/controllers/ports/http-response';
import { UseCase } from '@/usecases/ports/use-case';

export class ListRentedBikeRentHistoriesByIdController implements Controller {
  constructor(private useCase: UseCase) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const candidateToken = request.token;
      const bikeId = Number(request.params?.id);

      const bikesRentHitories = await this.useCase.perform(bikeId, candidateToken);
      return {
        statusCode: 200,
        body: bikesRentHitories,
      };
    } catch (error) {
      console.error(error);
      const userUnauthorized = error.constructor.name === 'UnauthorizedError';

      if (userUnauthorized) {
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
