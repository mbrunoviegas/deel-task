import { ContractStatus } from '@entities/enum/contract-status';
import { Either } from '@usecases/helpers/either';

/**
 * @swagger
 * components:
 *  schemas:
 *    GetContractByIdResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        terms:
 *          type: string
 *        status:
 *          type: string
 *          enum: [new, in_progress, terminated]
 *        contractorId:
 *          type: number
 *        clientId:
 *          type: number
 *        createdAt:
 *          type: string
 *          format: date
 *        updatedAt:
 *          type: string
 *          format: date
 */
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
