import { databaseProvider } from './database-provider';

export const setupProviders = async () => {
  await databaseProvider();
};
