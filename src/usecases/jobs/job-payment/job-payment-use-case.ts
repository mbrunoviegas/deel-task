import { UseCase } from '@usecases/port/use-case';
import { JobPaymentRequest } from './interfaces/job-payment-request';
import { JobPaymentResponseEither } from './interfaces/job-payment-response';
import { inject, injectable } from 'tsyringe';
import { failure, success } from '@usecases/helpers/either';
import { JobsRepository } from '@usecases/port/repositories/jobs-repository';

export interface JobPaymentUseCase extends UseCase<JobPaymentRequest, JobPaymentResponseEither> { }

@injectable()
export class JobPayment implements JobPaymentUseCase {
  constructor(
    @inject('JobsRepository')
    private jobsRepository: JobsRepository,
  ) {}

  async execute(request: JobPaymentRequest): Promise<JobPaymentResponseEither> {
    try {
      await this.jobsRepository.payJob(request.jobId, request.clientProfile.balance);

      return success();
    } catch (error) {
      console.log('Error when trying to pay for a job', error);
      return failure(error);
    }
  }
  
}
