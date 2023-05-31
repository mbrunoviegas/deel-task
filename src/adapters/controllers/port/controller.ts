import { Request } from './request';
import { Response } from './response';

export abstract class Controller {
  abstract handle(request: Request): Promise<Response>;

  protected ok<T>(body?: T): Response<T> {
    return {
      statusCode: 200,
      body,
    };
  }

  protected internalError(): Response {
    return {
      statusCode: 500,
      body: {
        message: 'Internal server error',
      },
    };
  }

  protected notFoundError(message: string): Response {
    return {
      statusCode: 404, 
      body: {
        message,
      },
    };
  }
}
