import { adapterRouterJson } from '@external/http/express-route-adapter';
import { Router } from 'express';

export const adminRoutes = Router();

/**
 * @swagger
 * /admin/profession/best:
 *  get:
 *    tags:
 *    - Admin
 *    summary: Get Best Profession
 *    description: Profession with the most earnings
 *    parameters:
 *       - in: header
 *         required: true
 *         name: profile_id
 *         schema:
 *           type: string
 *       - in: query
 *         required: true
 *         name: start
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         required: true
 *         name: end
 *         schema:
 *           type: string
 *           format: date
 *    responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                profession:
 *                  type: string
 *       401:
 *        description: Unauthorized.
 *       500:
 *        description: Internal server error
 */
adminRoutes.get('/profession/best', adapterRouterJson('GetBestProfessionController'));

/**
 * @swagger
 * /admin/clients/best:
 *  get:
 *    tags:
 *    - Admin
 *    summary: Get Best Client
 *    description: Gets the best client
 *    parameters:
 *       - in: header
 *         required: true
 *         name: profile_id
 *         schema:
 *           type: string
 *       - in: query
 *         required: true
 *         name: start
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         required: true
 *         name: end
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         required: true
 *         name: limit
 *         schema:
 *           type: number
 *    responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GetBestClientsResponse"
 *       401:
 *        description: Unauthorized.
 *       500:
 *        description: Internal server error
 */
adminRoutes.get('/clients/best', adapterRouterJson('GetBestClientsController'));
