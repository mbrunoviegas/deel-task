import { adapterRouterJson } from '@external/http/express-route-adapter';
import { Router } from 'express';

export const adminRoutes = Router();

adminRoutes.get('/profession/best', adapterRouterJson('GetBestProfessionController'));
adminRoutes.get('/clients/best', adapterRouterJson('GetBestClientsController'));
