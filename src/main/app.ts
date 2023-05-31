import 'reflect-metadata';
import '@external/dependency-injection/containers';
import bodyParser from 'body-parser';
import express from 'express';
import { setupRoutes } from './routes';
import { setupProviders } from './provider';
import { setupSwagger } from './doc/swagger';

export const app = async () => {
  const expressApp = express();
  await setupProviders();
  expressApp.use(bodyParser.json());
  setupRoutes(expressApp);
  setupSwagger(expressApp);

  return expressApp;
};
