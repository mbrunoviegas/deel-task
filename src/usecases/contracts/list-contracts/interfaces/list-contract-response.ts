import { Contract } from '@entities/contract';
import { Either } from '@usecases/helpers/either';

export type ListContractsResponseEither = Either<Error, Contract[]>;
