import { ListContractsUseCase } from '@usecases/contracts/list-contracts/list-contracts-use-case';
import { inject, injectable } from 'tsyringe';
import { Controller } from '../port/controller';
import { Request } from '../port/request';
import { Response } from '../port/response';

@injectable()
export class ListContractsController extends Controller {
  constructor(
    @inject('ListContractsUseCase')
    private useCase: ListContractsUseCase,
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
