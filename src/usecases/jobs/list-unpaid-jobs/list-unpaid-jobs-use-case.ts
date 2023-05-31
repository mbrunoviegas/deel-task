import { ContractStatus } from '@entities/enum/contract-status';
import { failure, success } from '@usecases/helpers/either';
import { JobsRepository } from '@usecases/port/repositories/jobs-repository';
import { UseCase } from '@usecases/port/use-case';
import { inject, injectable } from 'tsyringe';
import { ListUnpaidJobsRequest } from './interfaces/list-unpaid-jobs-request';
import { ListUnpaidJobsResponseEither } from './interfaces/list-unpaid-jobs-response';

export interface ListUnpaidJobsUseCase extends UseCase<ListUnpaidJobsRequest, ListUnpaidJobsResponseEither> { }

@injectable()
export class ListUnpaidJobs implements ListUnpaidJobsUseCase {
  constructor(
    @inject('JobsRepository')
    private jobsRepository: JobsRepository,
  ) { }
  
  async execute(request: ListUnpaidJobsRequest): Promise<ListUnpaidJobsResponseEither> {
    try {
      const response = await this.jobsRepository.listJobs({
        clientId: request.profile.id,
        contractorId: request.profile.id,
        contractStatus: [ContractStatus.InProgress],
        paid: false,
      });

      return success(response);
    } catch (error) {
      console.log('Error when trying to list all unpaid jobs', error);
      return failure(error);
    }
  }
}
