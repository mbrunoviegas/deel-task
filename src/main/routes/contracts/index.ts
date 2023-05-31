import { adapterRouterJson } from '@external/http/express-route-adapter';
import { Router } from 'express';

export const contractsRoutes = Router();

/**
 * @swagger
 * /contracts:
 *  get:
 *    tags:
 *    - Contracts
 *    summary: List Contracts
 *    description: Returns a list of contracts
 *    parameters:
 *       - in: header
 *         required: true
 *         name: profile_id
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ListContractsResponse"
 *       401:
 *        description: Unauthorized.
 *       500:
 *        description: Internal server error
 */
contractsRoutes.get('/', adapterRouterJson('ListContractsController'));

/**
 * @swagger
 * /contracts/{id}:
 *  get:
 *    tags:
 *    - Contracts
 *    summary: Contract By Id
 *    description: Returns a contract based o it's ID
 *    parameters:
 *       - in: header
 *         required: true
 *         name: profile_id
 *         schema:
 *           type: string
 *       - in: path
 *         required: true
 *         name: id
 *         schema:
 *           type: number
 *    responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GetContractByIdResponse"
 *       401:
 *        description: Unauthorized.
 *       404:
 *        description: Not found.
 *       500:
 *        description: Internal server error
 */
contractsRoutes.get('/:id', adapterRouterJson('GetContractByIdController'));
