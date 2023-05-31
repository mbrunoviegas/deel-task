import { Either } from '@usecases/helpers/either';

/**
 * @swagger
 * components:
 *  schemas:
 *    GetBestClientsResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        fullName:
 *          type: string
 *        paid:
 *          type: number
 */
export interface GetBestClientsResponse {
  id: number;
  fullName: string;
  paid: number;
}

export type GetBestClientsResponseEither = Either<Error, GetBestClientsResponse[]>;
