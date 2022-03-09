// // this file will contain all the authentication models
import { Response, Request } from 'express';

//import jwt to check tokens before create new books.
import jwt from 'jsonwebtoken';

//import dotenv and initialize
import dotenv from 'dotenv';
dotenv.config();

import jwt_decode from 'jwt-decode';

//'auth' is a middleware that requires token from the user to invoke certain sensitive routes that
export const auth = (req: Request, res: Response, next: Function) => {
  try {
    //.verify() returns true or false
    jwt.verify(req.body.token, process.env.TOKEN_PASS as string);

    //use next() method to go to the next method, to prevent program hanging
    next();
  } catch (error) {
    //401 for unauthorized
    res.status(401);
    //give the user feedback on the problem
    res.send(
      `you are not authorized!! sign in first, then provide your token..`
    );
  }
};

//this function will decode the entered token and get the payload from it, here the payload is the user id.
export const parseJwt = (token: string) => {
  // let decode = jwt_decode(token);
  let decoded = jwt.decode(token);
  return decoded;
};
