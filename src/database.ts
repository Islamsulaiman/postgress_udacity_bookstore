import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { DATABASE_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV, POSTGRES_test_DB, POSTGRES_USER_test } =
  process.env;


let client;  
console.log(ENV);

if(ENV === 'test'){
  client = new Pool({
    host: DATABASE_HOST,
    database: POSTGRES_test_DB,
    user: POSTGRES_USER_test,
    password: POSTGRES_PASSWORD,
});
}

if(ENV === 'dev'){
  client = new Pool({
    host: DATABASE_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});
}
console.log(client)

export default client;
