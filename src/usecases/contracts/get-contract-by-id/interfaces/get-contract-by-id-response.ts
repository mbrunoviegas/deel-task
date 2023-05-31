import { ContractStatus } from '@entities/enum/contract-status';
import { Either } from '@usecases/helpers/either';

export interface GetContractByIdResponse {
  id: number;
  terms: string;
  status: ContractStatus;
  contractorId: number;
  clientId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type GetContractByIdResponseEither = Either<Error, GetContractByIdResponse>;
