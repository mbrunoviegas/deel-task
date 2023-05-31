import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
  models: [__dirname + '/models'],
});

