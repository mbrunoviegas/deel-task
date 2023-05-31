import { inject, injectable } from 'tsyringe';
import { Controller } from '../port/controller';
import { Request } from '../port/request';
import { Response } from '../port/response';
import { JobPaymentUseCase } from '@usecases/jobs/job-payment/job-payment-use-case';
import { JobPaymentRequest } from '@usecases/jobs/job-payment/interfaces/job-payment-request';

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
      return this.notFoundError(response.value.message); //TODO update
    }

    return this.ok();
  }

}
