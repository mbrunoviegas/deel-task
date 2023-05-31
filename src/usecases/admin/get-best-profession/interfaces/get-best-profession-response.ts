import { Either } from '@usecases/helpers/either';

export interface GetBestProfessionResponse {
  profession: string;
}

export type GetBestProfessionResponseEither = Either<Error, GetBestProfessionResponse>;
