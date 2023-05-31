import { sequelize } from '@external/database';

export const databaseProvider = async () => {
  try {
    await sequelize.sync();
    console.log('Database connected');
  } catch (error) {
    console.log('Error when try to establish connection with database', error);
  }
};
