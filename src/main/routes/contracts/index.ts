import { adapterRouterJson } from '@external/http/express-route-adapter';
import { Router } from 'express';

export const contractsRoutes = Router();

contractsRoutes.get('/', adapterRouterJson('ListContractsController'));
contractsRoutes.get('/:id', adapterRouterJson('GetContractByIdController'));
