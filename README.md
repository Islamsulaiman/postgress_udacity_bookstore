# Storefront Backend Project

## Getting Started

This project is an API for a store website.

## USED Technologies

This API uses various technologies to achieve the required functionality:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- ESLint for linting the code.
- Prettier for formatting the code to be consistent.
- TypeScript
- nodemon for automatic reload at development stage
- postgres for data base

## Setting up the postgres DB

### on postgres shell

1. create main DB:

- run ( CREATE DATABASE shopping; ) to create a data base on your machine called "shopping"
- create a user on postgres by running ( CREATE USER shopping_user WITH PASSWORD 'password123'; )
- run '\c shopping' to connect to our DB.
- run ( GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user; ) so we can access and edit on our DB.

2. Create test DB -if you want to perform testing using jasmine- :

- run ( CREATE DATABASE shopping_test; ) to create a data base on your machine called "shopping_test"
- create a user on postgres by running ( CREATE USER shopping_user_test WITH PASSWORD 'password123'; )
- run ( \c shopping_test ) to connect to our DB.
- run ( GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user_test; ) so we can access and edit on our DB Via our newly created user.

### on our machine

- clone the project
- run 'npm install' , to install all th needed packages
- run 'npm install -g db-migrate' to install db-migrate globally so we can migrate tables to our DB.
- run 'db-migrate up' to create all of our DB tables to interact with our node project.

### Note:

- to delete all created tables at once, run "db-migrate reset" , don't run "db-migrate down" because it wont delete tables with foreign-key constrains.

## Setup core packages:

- within console, run (npm install) to install all the needed packages

## Environment variables

- This project needs Environment variables to be able to run as expected, but because this variables could be a sensitive info so you need to give your values for some of them.
- I will provide the variables names, then you should give them values:

  1.  create (.env) file in the root folder of the app
  2.  the variables are:

      DATABASE_HOST = <your machine host usually = 127.0.0.1>
      POSTGRES_DB = shopping
      POSTGRES_USER = shopping_user
      POSTGRES_PASSWORD = pasword123
      ENV = dev
      POSTGRES_test_DB = shopping_test
      POSTGRES_USER_test = shopping_user_test
      SALT_NO = <this is the number of hashing cycles for password hashing, you could add any number>
      BCRYPT_PASS = <this the added salt on user password before hashing, you could add any string but keep it secure and dont change it or you will lose your data in DB>
      TOKEN_PASS = <this is the password used for creating and verifying user tokens, you can add any string but keep it secure and dont change it>

  3.  add the provided variables with your values to them inside (.env) file.

  ## How to run :

  - within console run (npm run start) this will start a server for you to interact with the API either using postman or any browser.
  - I will state how to use it in details inside REQUIRMENTS.md.
