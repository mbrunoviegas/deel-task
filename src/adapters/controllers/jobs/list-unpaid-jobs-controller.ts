import { ListUnpaidJobsUseCase } from '@usecases/jobs/list-unpaid-jobs/list-unpaid-jobs-use-case';
import { inject, injectable } from 'tsyringe';
import { Controller } from '../port/controller';
import { Request } from '../port/request';
import { Response } from '../port/response';

@injectable()
export class ListUnpaidJobsController extends Controller {
  constructor(
    @inject('ListUnpaidJobsUseCase')
    private useCase: ListUnpaidJobsUseCase,
  ) {
    super();
  }

  async handle(request: Request): Promise<Response> {
    const response = await this.useCase.execute({
      profile: request.profile,
    });

    if (response.isFailure()) {
      return this.internalError();
    }

    return this.ok(response.value);
  }
}
