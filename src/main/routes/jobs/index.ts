import { adapterRouterJson } from '@external/http/express-route-adapter';
import { Router } from 'express';

export const jobsRoutes = Router();

jobsRoutes.get('/unpaid', adapterRouterJson('ListUnpaidJobsController'));
jobsRoutes.post('/:jobId/pay', adapterRouterJson('JobPaymentController'));
