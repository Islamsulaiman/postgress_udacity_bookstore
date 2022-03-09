//import SQL methods class to destructure it later and the type
import { Product, Product_handlers } from '../models/product';

//import auth middleware, to authenticate user using tokens before invoking certain sensitive routes
import { auth } from '../services/authenticate';

//import express;
import express, { Request, Response } from 'express';

//import jwt to check tokens before create new books.
import jwt from 'jsonwebtoken';

//import dotenv and initialize
import dotenv from 'dotenv';
dotenv.config();

//create an instance of Book_handlers class
let product = new Product_handlers();

//use this method for error handling instead of copy past at every line.
const errorMethod = (error: unknown) => {
  return new Error(`The Error is : ${error as unknown as string}`);
};

//create a route for index() method;
//this route takes an argument id
const index = async (_req: Request, res: Response): Promise<void> => {
  //add _ before req, because we are not going to use it here.
  try {
    const result: object = await product.index();
    res.json(result);
  } catch (error) {
    // console.log(`Error from INDEX ${error}`);
    throw errorMethod(error);
  }
};

//create a route for show() method;
//this route takes an argument id
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: object = await product.show(parseInt(req.params.id));

    res.json(result);
  } catch (error) {
    throw errorMethod(error);
  }
};

//create a route for delete() method;
//this route takes an argument id
const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    try {
      jwt.verify(req.body.token, process.env.TOKEN_PASS as string);
    } catch (error) {
      //401 for unauthorized
      res.status(401);
      res.send('you are not authorized to delete a book, sign in first!.');
    }
    const result: object = await product.delete(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    throw errorMethod(error);
  }
};

//create a route for create() method;
//this route takes an argument id
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    //since create method from the class takes an object of type Books, we need to create an object with the same exact keys with values from req.body object, to be actually passed to create method so it will return to result variable.
    const productInfo: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    //this try and catch block to verify first if the user is logged by checking the provided token by client
    try {
      jwt.verify(req.body.token, process.env.TOKEN_PASS as string);
    } catch (error) {
      res.status(401);
      res.send('you are not authorized to create a book, sign in first!.');
    }

    //pass ProductInfo object to create to invoke the method from model file to actually connect to DB.
    const result = await product.create(productInfo);
    res.json(result);
  } catch (error) {
    throw errorMethod(error);
  }
};

//to get all products ordered by category
const allProductsByCategory = async (_req: Request, res: Response) => {
  try {
    const result = await product.allProductsByCategory();
    res.json(result);
  } catch (error) {
    throw errorMethod(error);
  }
};

export const products_route = (app: express.Application): void => {
  app.get('/allProducts', index);
  app.get('/allProductsByCategory', allProductsByCategory);
  app.get('/showProduct/:id', show);
  app.delete('/deleteProduct/:id', auth, destroy); //authenticate sensitive route
  app.post('/createProduct', auth, create); //authenticate sensitive route
};
