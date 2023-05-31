import { adapterRouterJson } from '@external/http/express-route-adapter';
import { Router } from 'express';

export const jobsRoutes = Router();

/**
 * @swagger
 * /jobs/unpaid:
 *  get:
 *    tags:
 *    - Jobs
 *    summary: List Unpaid Jobs
 *    description: Returns a list of unpaid jobs
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
 *               $ref: "#/components/schemas/ListUnpaidJobsResponse"
 *       401:
 *        description: Unauthorized.
 *       500:
 *        description: Internal server error
 */
jobsRoutes.get('/unpaid', adapterRouterJson('ListUnpaidJobsController'));

/**
 * @swagger
 * /jobs/{jobId}/pay:
 *  post:
 *    tags:
 *    - Jobs
 *    summary: Pay for a job
 *    description: Make a job payment
 *    parameters:
 *       - in: header
 *         required: true
 *         name: profile_id
 *         schema:
 *           type: string
 *       - in: path
 *         required: true
 *         name: jobId
 *         schema: 
 *          type: number
 *    responses:
 *       200:
 *         description: Success.
 *       401:
 *        description: Unauthorized.
 *       500:
 *        description: Internal server error
 */
jobsRoutes.post('/:jobId/pay', adapterRouterJson('JobPaymentController'));
