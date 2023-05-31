import { ContractStatus } from '@entities/enum/contract-status';
import { Job } from '@entities/job';

export interface ListJobsOptions {
  contractStatus: ContractStatus[];
  clientId?: number;
  contractorId?: number;
  paid: boolean;
}

export interface JobsRepository {
  listJobs(options: ListJobsOptions): Promise<Job[]>;
  getJobById(jobId: number): Promise<Job>;
  payJob(jobId: number, clientBalance: number): Promise<void>;
}
