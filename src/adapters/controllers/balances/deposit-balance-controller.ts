import { inject, injectable } from 'tsyringe';
import { Controller } from '../port/controller';
import { DepositBalanceUseCase } from '@usecases/profile/deposit-balance/deposit-balance-use-case';
import { Request } from '../port/request';
import { Response } from '../port/response';
import { DepositBalanceRequest } from '@usecases/profile/deposit-balance/interfaces/deposit-balance-request';

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
      return this.internalError();
    }

    return this.ok();
  }
}
