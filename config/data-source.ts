import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'accel33',
  password: '',
  database: 'accel33',
  synchronize: true,
  logging: false,
  entities: [__dirname + '/entities/*.ts'],
});
