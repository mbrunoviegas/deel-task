import { GetBestClientsController } from '@adapters/controllers/admin/get-best-clients-controller';
import { GetBestProfessionController } from '@adapters/controllers/admin/get-best-profession-controller';
import { DepositBalanceController } from '@adapters/controllers/balances/deposit-balance-controller';
import { GetContractByIdController } from '@adapters/controllers/contracts/get-contract-by-id-controller';
import { ListContractsController } from '@adapters/controllers/contracts/list-contracts-controller';
import { ListUnpaidJobsController } from '@adapters/controllers/jobs/list-unpaid-jobs-controller';
import { ContractsRepositorySequelize } from '@external/repositories/contracts-repository';
import { JobsRepositorySequelize } from '@external/repositories/jobs-repository';
import { ProfileRepositorySequelize } from '@external/repositories/profile-repository';
import { GetBestClients } from '@usecases/admin/get-best-clients/get-best-clients-use-case';
import { GetBestProfession } from '@usecases/admin/get-best-profession/get-best-profession-use-case';
import { GetContractById } from '@usecases/contracts/get-contract-by-id/get-contract-by-id-use-case';
import { ListContracts } from '@usecases/contracts/list-contracts/list-contracts-use-case';
import { ListUnpaidJobs } from '@usecases/jobs/list-unpaid-jobs-use-case';
import { DepositBalance } from '@usecases/profile/deposit-balance/deposit-balance-use-case';
import { GetProfileById } from '@usecases/profile/get-profile-by-id/get-profile-by-id-use-case';
import { container } from 'tsyringe';

export const containerV1 = container.createChildContainer();

// UseCases
containerV1.register('ListContractsUseCase', {
  useClass: ListContracts,
});
containerV1.register('GetContractByIdUseCase', {
  useClass: GetContractById,
});
containerV1.register('ListUnpaidJobsUseCase', {
  useClass: ListUnpaidJobs,
});
containerV1.register('GetBestProfessionUseCase', {
  useClass: GetBestProfession,
});
containerV1.register('GetBestClientsUseCase', {
  useClass: GetBestClients,
});
containerV1.register('GetProfileByIdUseCase', {
  useClass: GetProfileById,
});
containerV1.register('DepositBalanceUseCase', {
  useClass: DepositBalance,
});

// Controllers
containerV1.register('ListContractsController', {
  useClass: ListContractsController,
});
containerV1.register('GetContractByIdController', {
  useClass: GetContractByIdController,
});
containerV1.register('ListUnpaidJobsController', { 
  useClass: ListUnpaidJobsController,
});
containerV1.register('GetBestProfessionController', {
  useClass: GetBestProfessionController,
});
containerV1.register('GetBestClientsController', {
  useClass: GetBestClientsController,
});
containerV1.register('DepositBalanceController', {
  useClass: DepositBalanceController,
});

// Repositories
containerV1.register('ContractsRepository', {
  useClass: ContractsRepositorySequelize,
});
containerV1.register('ProfileRepository', {
  useClass: ProfileRepositorySequelize,
});
containerV1.register('JobsRepository', {
  useClass: JobsRepositorySequelize,
});
