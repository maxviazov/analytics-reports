import { Knex } from 'knex';
import * as dotenv from 'dotenv';

// Load environment variables from .env file into process.env
dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: Number(process.env.POSTGRES_PORT),
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: './src/migrations',
    },
    debug: true,
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: Number(process.env.POSTGRES_PORT),
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: './dist/migrations',
    },
    debug: true,
  },
};

export default config;
