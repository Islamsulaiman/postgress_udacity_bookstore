import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { DATABASE_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env;

const client = new Pool({
  host: DATABASE_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
