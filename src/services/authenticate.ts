// // this file will contain all the authentication models
import {Response, Request} from "express";

//import jwt to check tokens before create new books.
import jwt from "jsonwebtoken";

//import dotenv and initialize
import dotenv from "dotenv";
dotenv.config();

//'auth' is a middleware that requires token from the user to invoke certain sensitive routes that 
export const auth = (methodName: string, req: Request, res: Response, next: Function)=>{
    try {
      jwt.verify(req.body.token, process.env.TOKEN_PASS as string);

      //use next() method to go to the next method, to prevent program hanging
      next();
    } catch (error) {
      //401 for unauthorized
      res.status(401)
      //give the user feedback on the problem
      res.send(`you are not authorized to ${methodName} a book, sign in first!.`)
    }
}