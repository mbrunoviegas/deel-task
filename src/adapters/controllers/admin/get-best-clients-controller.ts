import { inject, injectable } from 'tsyringe';
import { Controller } from '../port/controller';
import { Request } from '../port/request';
import { Response } from '../port/response';
import { GetBestClientsUseCase } from '@usecases/admin/get-best-clients/get-best-clients-use-case';

@injectable()
export class GetBestClientsController extends Controller {
  constructor(
    @inject('GetBestClientsUseCase')
    private useCase: GetBestClientsUseCase,
  ) { 
    super();
  }

  async handle(request: Request): Promise<Response> {
    const { start, end, limit } = request.query as {
      start: Date;
      end: Date; 
      limit: number;
    };

    const response = await this.useCase.execute({
      start,
      end,
      limit,
    });

    if (response.isFailure()) {
      return this.internalError();
    }

    return this.ok(response.value);
  }
}
