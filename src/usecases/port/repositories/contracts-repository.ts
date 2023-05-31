import { Contract } from '@entities/contract';
import { ContractStatus } from '@entities/enum/contract-status';

export interface ListContractsOptions {
  status: ContractStatus[];
  profileId: number;
}

export interface GetContractByIdOptions {
  profileId: number;
}

export interface ContractsRepository {
  getById(id: number, options?: GetContractByIdOptions): Promise<Contract>;
  listContracts(options: ListContractsOptions): Promise<Contract[]>;
}
