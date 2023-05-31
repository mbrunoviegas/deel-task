import { adapterRouterJson } from '@external/http/express-route-adapter';
import { Router } from 'express';

export const balancesRoutes = Router();

balancesRoutes.post('/deposit/:userId', adapterRouterJson('DepositBalanceController'));
