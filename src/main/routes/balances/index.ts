import { adapterRouterJson } from '@external/http/express-route-adapter';
import { Router } from 'express';

export const balancesRoutes = Router();

/**
 * @swagger
 * /balances/deposit/{userId}:
 *  post:
 *    tags:
 *    - Balances
 *    summary: Deposit a value in clients account
 *    description: Make a deposit
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              depositAmount:
 *                type: number
 *    parameters:
 *       - in: header
 *         required: true
 *         name: profile_id
 *         schema:
 *           type: string
 *       - in: path
 *         required: true
 *         name: userId
 *         schema: 
 *          type: number
 *    responses:
 *       200:
 *         description: Success.
 *       400:
 *        description: Bad Request.
 *       401:
 *        description: Unauthorized.
 *       500:
 *        description: Internal server error
 */
balancesRoutes.post('/deposit/:userId', adapterRouterJson('DepositBalanceController'));
