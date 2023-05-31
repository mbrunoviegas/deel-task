import { inject, injectable } from 'tsyringe';
import { Controller } from '../port/controller';
import { DepositBalanceUseCase } from '@usecases/profile/deposit-balance/deposit-balance-use-case';
import { Request } from '../port/request';
import { Response } from '../port/response';
import { DepositBalanceRequest } from '@usecases/profile/deposit-balance/interfaces/deposit-balance-request';
import { InvalidAmountError } from '@usecases/errors/invalid-amount-error';

@injectable()
export class DepositBalanceController extends Controller {
  
  constructor(
    @inject('DepositBalanceUseCase')
    private useCase: DepositBalanceUseCase,
  ) {
    super();
  }

  async handle(request: Request<DepositBalanceRequest>): Promise<Response> {
    const { depositAmount } = request.body as Pick<DepositBalanceRequest, 'depositAmount'>;
    const { userId } = request.params as Pick<DepositBalanceRequest, 'userId'>;

    const response = await this.useCase.execute({ depositAmount, userId });

    if (response.isFailure()) {
      return this.mapError(response.value);
    }

    return this.ok();
  }

  private mapError(error: Error): Response {
    if (error instanceof InvalidAmountError) {
      return this.badRequestError(error.message);
    }

    return this.internalError();
  }
}
