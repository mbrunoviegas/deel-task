import { GetContractByIdUseCase } from '@usecases/contracts/get-contract-by-id/get-contract-by-id-use-case';
import { inject, injectable } from 'tsyringe';
import { Controller } from '../port/controller';
import { Request } from '../port/request';
import { Response } from '../port/response';
import { ContractNotFoundError } from '@usecases/errors/contract-not-found-error';

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
      return this.mapError(response.value);
    }

    return this.ok(response.value);
  }

  private mapError(error: Error): Response {
    if (error instanceof ContractNotFoundError) {
      return this.notFoundError(error.message);
    }

    return this.internalError();
  }
}
