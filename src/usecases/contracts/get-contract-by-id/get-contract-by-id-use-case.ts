import { UseCase } from '@usecases/port/use-case';
import { GetContractByIdRequest } from './interfaces/get-contract-by-id-request';
import { GetContractByIdResponseEither } from './interfaces/get-contract-by-id-response';
import { failure, success } from '@usecases/helpers/either';
import { inject, injectable } from 'tsyringe';
import { ContractsRepository } from '@usecases/port/repositories/contracts-repository';
import { ContractNotFoundError } from '@usecases/errors/contract-not-found-error';

export interface GetContractByIdUseCase extends UseCase<GetContractByIdRequest, GetContractByIdResponseEither> { }

@injectable()
export class GetContractById implements GetContractByIdUseCase {
  constructor(
    @inject('ContractsRepository')
    private contractsRepository: ContractsRepository,
  ) {}
  
  async execute(request: GetContractByIdRequest): Promise<GetContractByIdResponseEither> {
    try {
      const contract = await this.contractsRepository.getById(request.contractId, { profileId: request.profile.id });

      if (!contract) {
        return failure(new ContractNotFoundError());
      }

      return success(contract);
    } catch (error) {
      console.log('Error when retrieving contract %d for profile %d', request.contractId, request.profile.id);
      return failure(error);
    }
  }
}
