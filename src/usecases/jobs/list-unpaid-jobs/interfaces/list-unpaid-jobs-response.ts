import { Either } from '@usecases/helpers/either';

export interface ListUnpaidJobsResponse {
  id: number;
  description: string;
  price: number;
  paid: boolean;
  paymentDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type ListUnpaidJobsResponseEither = Either<Error, ListUnpaidJobsResponse[]>;
