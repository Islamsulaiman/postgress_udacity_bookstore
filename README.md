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

## Setting up the project

### on postgres shell

- run 'CREATE DATABASE shopping' to create a data base on your machine called "shopping"
- create a user on postgres by running 'CREATE USER shopping_user WITH PASSWORD 'password123'; '
- run '\c shopping' to connect to our DB
- run 'GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;' so we can access and edit on our DB.

### on our machine

- clone the project
- run 'npm install' , to install all th needed packages
- run 'npm install -g db-migrate' to install db-migrate globally so we can migrate tables to our DB.
- run 'db-migrate up' to create all of our DB tables to interact with our node project.

### Note:

- to delete all created tables at once, run "db-migrate reset" , don't run "db-migrate down" because it wont delete tables with foreign-key constrains.
