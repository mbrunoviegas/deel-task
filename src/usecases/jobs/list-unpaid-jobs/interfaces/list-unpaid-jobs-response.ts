import { Either } from '@usecases/helpers/either';


/**
 * @swagger
 * components:
 *  schemas:
 *    ListUnpaidJobsResponse:
 *      type: array
 *      items:
 *        type: object
 *        properties: 
 *           id: 
 *             type: number
 *           description: 
 *             type: string
 *           price: 
 *             type: number
 *           paid: 
 *             type: boolean
 *           createdAt: 
 *             type: Date
 *           updatedAt: 
 *             type: Date
 */
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
