import { updateUsers, Users, Users_handler } from '../models/users';

//getToken() get and parse the token from request header so we can use token to verify user.
import { getToken } from '../services/authenticate';

const user = new Users_handler();

import express, { Request, Response } from 'express';

//import authentication method for restricted routes
import { authHeader, auth } from '../services/authenticate';

//use this method for error handling instead of copy past at every line.
const errorMethod = (error: unknown) => {
  return new Error(`The Error is : ${error as unknown as string}`);
};

//adding underscore before mandatory unused parameter, will make the console ignore it, which is what we want here.
const indexUsers = async (_req: Request, res: Response) => {
  try {
    const result = await user.index();
    res.json(result);
  } catch (error) {
    throw errorMethod(error);
  }
};

const showUsers = async (req: Request, res: Response) => {
  try {
    const result = await user.show(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    throw errorMethod(error);
  }
};

const destroyUsers = async (req: Request, res: Response) => {

  const token = getToken(req, res);
  try {
    const result = await user.destroy(token);
    res.json(result);
  } catch (error) {
    throw errorMethod(error);
  }
};

const createUsers = async (req: Request, res: Response) => {
  try {
    const userInfo: Users = {
      f_name: req.body.f_name,
      l_name: req.body.l_name,
      user_name: req.body.user_name,
      password: req.body.password,
      age: req.body.age,
    };
    const result = await user.create(userInfo);
    res.json(result);
  } catch (error) {
    throw errorMethod(error);
  }
};

//authenticateUser method will return the hashed password if the user_name and the original password is correct as a checking on our values
const authenticateUser = async (req: Request, res: Response) => {
  try {
    const result = await user.authenticate(
      req.body.user_name,
      req.body.password
    );
    res.json(result);
  } catch (error) {
    throw errorMethod(error);
  }
};


//update will update the user data according to his entered data in the body
const updateUserHandler = async (req: Request, res: Response) => {
  const userInfo: updateUsers = {
    f_name: req.body.f_name,
    l_name: req.body.l_name,
    user_name: req.body.user_name,
    age: req.body.age,
    // token: req.body.token
  };

  const token = getToken(req, res);
  try {
    const result = await user.update(userInfo, token);
    res.json(result);
  } catch (error) {
    // res.send('make sure you input the correct user data and token!');
  }
};

export const usersRoutes = (app: express.Application) => {
  app.get('/showAllUsers', indexUsers);
  app.get('/showOneUser/:id', authHeader, showUsers);
  app.delete('/deleteUser',authHeader,  destroyUsers);
  app.post('/createUser', createUsers);
  app.get('/authenticateUser',  authenticateUser);
  app.post('/updateUser',authHeader , updateUserHandler);
};
