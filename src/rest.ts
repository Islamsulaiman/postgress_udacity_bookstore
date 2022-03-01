//import SQL methods class to destructure it later
import {Book_handlers } from "./models/books";

//import express;
import  express  from "express";

//create express route 
const route: express.Router = express.Router();

//create a route for index() method;
//this route takes an argument id
route.get('/books', (_req : express.Request, res : express.Response) =>{
    try {
        res.send('This is the INDEX route')
    } catch (error) {
        res.status(400);
        res.json(error);
    }
});
//create a route for show() method;
//this route takes an argument id
route.get('/books/:id', (req : express.Request, res : express.Response) =>{
    try {
        res.send('This is the SHOW route')
    } catch (error) {
        res.status(400);
        res.json(error);
    }
});
//create a route for delete() method;
//this route takes an argument id
route.get('/books/:id', (req : express.Request, res : express.Response) =>{
    try {
        res.send('This is the DELETE route')
    } catch (error) {
        res.status(400);
        res.json(error);
    }
});
//create a route for create() method;
//this route takes an argument id
route.get('/books/:id', (req : express.Request, res : express.Response) =>{
    try {
        res.send('This is the CREATE route')
    } catch (error) {
        res.status(400);
        res.json(error);
    }
});

