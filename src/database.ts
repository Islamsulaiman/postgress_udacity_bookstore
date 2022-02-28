//dotenv is the package that will access the '.env' file to get the secret values.
import dotenv from 'dotenv';
// pool is object that will initiate the connection between the DB and node
import { Pool } from 'pg';

// this line will initiate the dotenv package.
dotenv.config();

//these are the variables from .env file, destruct them from 'process.env' object which we get from .env.
const { DATABASE_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV, POSTGRES_test_DB, POSTGRES_USER_test } =
  process.env;

//initiate client, this will be an instance of Pool to initiate connection later
//give client it's type.
let client : Pool;  

//create if-else statement to check the value of ENV variable from '.env', to check if we are going to use the test DB or the main one
if(ENV === 'test'){
  //make an instance from Pool
  client = new Pool({
    host: DATABASE_HOST,
    database: POSTGRES_test_DB,
    user: POSTGRES_USER_test,
    password: POSTGRES_PASSWORD,
});
// use this if we are using the main DB
}else{
  client = new Pool({
    host: DATABASE_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});
}

export default client;
