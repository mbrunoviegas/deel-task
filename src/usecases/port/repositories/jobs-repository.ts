import { ContractStatus } from '@entities/enum/contract-status';
import { Job } from '@entities/job';

export interface ListJobsOptions {
  contractStatus: ContractStatus[];
  profileId: number;
}

export interface JobsRepository {
  listJobs(options: ListJobsOptions): Promise<Job[]>;
}
