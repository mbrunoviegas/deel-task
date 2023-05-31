import { Either } from '@usecases/helpers/either';

export interface ListContractsResponse {
  terms: string;
  status: 'new' | 'in_progress' | 'terminated';
  contractId: number;
  clientId: number;
}

export type ListContractsResponseEither = Either<Error, ListContractsResponse[]>;
