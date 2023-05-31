import { Express } from 'express';
import { contractsRoutes } from './contracts';
import { jobsRoutes } from './jobs';
import { adminRoutes } from './admin';

export const setupRoutes = (app: Express): void => {
  app.use('/contracts', contractsRoutes);
  app.use('/jobs', jobsRoutes);
  app.use('/admin', adminRoutes);
};
