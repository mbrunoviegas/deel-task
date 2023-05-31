import { inject, injectable } from 'tsyringe';
import { Controller } from '../port/controller';
import { GetBestProfessionUseCase } from '@usecases/admin/get-best-profession/get-best-profession-use-case';
import { Request } from '../port/request';
import { Response } from '../port/response';

@injectable()
export class GetBestProfessionController extends Controller {
  constructor(
    @inject('GetBestProfessionUseCase')
    private useCase: GetBestProfessionUseCase,
  ) { 
    super();
  }

  async handle(request: Request): Promise<Response> {
    const { start, end } = request.query as Record<string, Date>;

    const response = await this.useCase.execute({
      start,
      end,
    });

    if (response.isFailure()) {
      return this.internalError();
    }

    return this.ok(response.value);
  }
}
