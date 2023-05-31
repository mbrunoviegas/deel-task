import 'reflect-metadata';
import '@external/dependency-injection/containers';
import bodyParser from 'body-parser';
import express from 'express';
import { setupRoutes } from './routes';
import { getProfile } from './middleware/get-profile';
import { setupProviders } from './provider';

export const app = async () => {
  const expressApp = express();
  await setupProviders();
  expressApp.use(bodyParser.json());
  expressApp.use(getProfile);
  setupRoutes(expressApp);

  return expressApp;
};
