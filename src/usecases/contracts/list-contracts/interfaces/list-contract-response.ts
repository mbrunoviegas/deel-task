import { Contract } from '@entities/contract';
import { Either } from '@usecases/helpers/either';

/**
 * @swagger
 * components:
 *  schemas:
 *    ListContractsResponse:
 *      type: array
 *      items:
 *        type: object
 *        properties: 
 *           id: 
 *             type: number
 *           terms: 
 *             type: string
 *           status: 
 *             type: [new, in_progress, terminated]
 *           contractorId: 
 *             type: number
 *           clientId: 
 *             type: number
 *           createdAt: 
 *             type: Date
 *           updatedAt: 
 *             type: Date
 */
export type ListContractsResponseEither = Either<Error, Contract[]>;
