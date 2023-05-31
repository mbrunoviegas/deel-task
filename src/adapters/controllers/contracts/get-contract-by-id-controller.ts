import { GetContractByIdUseCase } from '@usecases/contracts/get-contract-by-id/get-contract-by-id-use-case';
import { inject, injectable } from 'tsyringe';
import { Controller } from '../port/controller';
import { Request } from '../port/request';
import { Response } from '../port/response';

@injectable()
export class GetContractByIdController extends Controller {
  constructor(
    @inject('GetContractByIdUseCase')
    private useCase: GetContractByIdUseCase,
  ) {
    super();
  }

  async handle(request: Request): Promise<Response> {
    const profile = request.profile;
    const { id } = request.params; 

    const response = await this.useCase.execute({
      contractId: id as number,
      profile,
    });

    if (response.isFailure()) {
      return this.internalError();
    }

    return this.ok(response.value);
  }
}
