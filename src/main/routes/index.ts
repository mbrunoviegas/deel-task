import { Express } from 'express';
import { contractsRoutes } from './contracts';
import { jobsRoutes } from './jobs';
import { adminRoutes } from './admin';
import { balancesRoutes } from './balances';
import { getProfile } from '@main/middleware/get-profile';

export const setupRoutes = (app: Express): void => {
  app.use('/contracts', getProfile, contractsRoutes);
  app.use('/jobs', getProfile, jobsRoutes);
  app.use('/admin', getProfile, adminRoutes);
  app.use('/balances', getProfile, balancesRoutes);
};
