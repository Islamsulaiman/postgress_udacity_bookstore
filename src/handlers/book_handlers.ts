//import SQL methods class to destructure it later and the type
import { Book, Book_handlers } from '../models/books';

//import express;
import express, { Request, Response } from 'express';

//create an instance of Book_handlers class
let book = new Book_handlers();

//create a route for index() method;
//this route takes an argument id
const index = async (_req: Request, res: Response): Promise<void> => {
  //add _ before req, because we are not going to use it here.
  try {
    const result: object = await book.index();
    res.json(result);
  } catch (error) {
    console.log(`Error from INDEX ${error}`);
  }
};

//create a route for show() method;
//this route takes an argument id
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: object = await book.show(parseInt(req.params.id));

    res.json(result);
  } catch (error) {
    console.log(`Error from SHOW ${error}`);
  }
};

//create a route for delete() method;
//this route takes an argument id
const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: object = await book.delete(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    console.log(`Error from DELETE ${error}`);
  }
};

//create a route for create() method;
//this route takes an argument id
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    //since create method from the class takes an object of type Books, we need to create an object with the same exact keys with values from req.body object, to be actually passed to create method so it will return to result variable.
    const bookInfo : Book = {
      title : req.body.title,
      total_pages : req.body.total_pages,
      author : req.body.author,
      type : req.body.type,
      summary : req.body.summary
    }
    //pass bookInfo object to create to invoke the method from model file to actually connect to DB.
    const result = await book.create(bookInfo)
    res.json(result);
  } catch (error) {
    console.log(`Error from CREATE ${error}`);
  }
};

export const index_route = (app: express.Application): void => {
  app.get('/book', index);
  app.get('/showBook/:id', show);
  app.delete('/deleteBook/:id', destroy);
  app.post('/createBook', create);
};

