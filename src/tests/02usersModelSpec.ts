// // in this file I'am testing all users model.

//import book_handlers to test each one of its methods
import { Users_handler } from '../models/users';
import { Users } from '../models/users';

//to create connection with the DB
import client from '../database';

//create an instance from the class to be able to test it's methods and return functions
const user = new Users_handler();

//supertest to test HTTP requests
import supertest from 'supertest';

// we will pass app object to supertest() method so we can access HTTP requests req and res
import { app } from '../server';

//pass app to supertest()
const requestUserModels = supertest(app);

describe('Test that every model inside usersModel is defined', () => {
  it('user.index is defined', () => {
    expect(user.index).toBeDefined();
  });
  it('user.show is defined', () => {
    expect(user.show).toBeDefined();
  });
  it('user.authenticate is defined', () => {
    expect(user.authenticate).toBeDefined();
  });
  it('user.create is defined', () => {
    expect(user.create).toBeDefined();
  });
  it('user.destroy is defined', () => {
    expect(user.destroy).toBeDefined();
  });
  it('user.update is defined', () => {
    expect(user.update).toBeDefined();
  });
});

//in this suite will test user behavior models.
describe('test create user logic', () => {

  //create user object that we will pass to create method like the body we send via postman, should match the real model.
  const userObject: Users = {
    f_name : "f_name test",
    l_name: "l_name test",
    user_name: "user_name test",
    password: "test pass",
    age: 20,
  }

  //this will run before all the tests, we should create our first user in this step so we can find someone to test on later, and this insures that we have user ready because the following tests order could change because it asynchronous functions. 
  beforeAll(async() =>{
    //using create method and the object we created as an argument for create model which takes user info as an object.
    const newUser = await user.create(userObject);
  }) 

  //this will help us delete the table and make it ready for the rest of tests inside this file and others because they are all conducted on the same DB and tables 
  afterAll(async()=>{
    const conn = await client.connect();

    //delete all created users inside users table to be fresh for other tests, 
    const sqlDELETE = "DELETE FROM users;";

    // after deleting all users, the id sequence would't start from 1 because when rows deleted the id sequence keep counting on, but we need in other test's after this one the sequence to start from 1 again, so we should alter the sequence like this.
    const sqlAlterTable = "ALTER SEQUENCE users_id_seq RESTART WITH 1;";
    
    //we need now to perform the previous two SQL queries.
    const Alter = await conn.query(sqlAlterTable);
    const Delete = await conn.query(sqlDELETE);

    conn.release();
  })

  it("user should be created under id 1",async ()=>{

    //now we are testing show() model that returns one user with id no.1 , that's why we altered the sequence because we depend on it in our tests
    const showOneUser = await user.show(1)
    //AFTER THE USER we created BEEN returned, we can expect the values we entered to be true like age. 
    expect(showOneUser.age).toBe(20);
  })

});
