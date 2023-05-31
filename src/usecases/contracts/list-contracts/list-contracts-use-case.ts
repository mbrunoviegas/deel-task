import { ContractStatus } from '@entities/enum/contract-status';
import { failure, success } from '@usecases/helpers/either';
import { ContractsRepository } from '@usecases/port/repositories/contracts-repository';
import { UseCase } from '@usecases/port/use-case';
import { inject, injectable } from 'tsyringe';
import { ListContractRequest } from './interfaces/list-contract-request';
import { ListContractsResponseEither } from './interfaces/list-contract-response';

export interface ListContractsUseCase extends UseCase<ListContractRequest, ListContractsResponseEither> { } 

@injectable()
export class ListContracts implements ListContractsUseCase {
  constructor(
    @inject('ContractsRepository')
    private contractRepository: ContractsRepository,
  ) { }
  
  async execute(request: ListContractRequest): Promise<ListContractsResponseEither> {
    try {
      const contracts = await this.contractRepository.listContracts({
        status: [ContractStatus.InProgress, ContractStatus.New],
        profileId: request.profile.id,
      });

      return success(contracts);
    } catch (error) {
      console.log('Error when trying to find contracts for profile %d: %o', request.profile.id, error);
      return failure(error);
    }
  }
}
