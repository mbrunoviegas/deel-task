import { InsufficientAmountError } from '@usecases/errors/insufficient-amount-error';
import { JobNotFoundError } from '@usecases/errors/job-not-found-error';
import { JobPaymentRequest } from '@usecases/jobs/job-payment/interfaces/job-payment-request';
import { JobPaymentUseCase } from '@usecases/jobs/job-payment/job-payment-use-case';
import { inject, injectable } from 'tsyringe';
import { Controller } from '../port/controller';
import { Request } from '../port/request';
import { Response } from '../port/response';

@injectable()
export class JobPaymentController extends Controller {
  constructor(
    @inject('JobPaymentUseCase')
    private useCase: JobPaymentUseCase,
  ) {
    super();
  }
  
  
  async handle(request: Request): Promise<Response> {
    const { jobId } = request.params as Pick<JobPaymentRequest, 'jobId'>;
  
    const response = await this.useCase.execute({
      clientProfile: request.profile,
      jobId,
    });

    if (response.isFailure()) {
      return this.mapError(response.value);
    }

    return this.ok();
  }

  private mapError(error: Error): Response {
    if (error instanceof JobNotFoundError) {
      return this.notFoundError(error.message);
    } 
    
    if (error instanceof InsufficientAmountError) {
      return this.badRequestError(error.message);
    }

    return this.internalError();
  }

}
