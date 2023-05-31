import { Either } from '@usecases/helpers/either';

export interface GetBestClientsResponse {
  id: number;
  fullName: string;
  paid: number;
}

export type GetBestClientsResponseEither = Either<Error, GetBestClientsResponse[]>;
