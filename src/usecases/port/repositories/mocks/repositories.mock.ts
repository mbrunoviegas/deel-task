import { mock } from 'jest-mock-extended';
import { ContractsRepository } from '../contracts-repository';
import { JobsRepository } from '../jobs-repository';
import { ProfileRepository } from '../profile-repository';

export const contractsRepositoryMock = mock<ContractsRepository>();
export const profilesRepositoryMock = mock<ProfileRepository>();
export const jobsRepositoryMock = mock<JobsRepository>();
