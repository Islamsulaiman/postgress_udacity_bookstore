import { Users, Users_handler } from "../models/users";

const user =new Users_handler();

import express, {Request, Response} from 'express';

//import authentication method for restricted routes
import { auth } from "../services/authenticate";

//use this method for error handling instead of copy past at every line.
const errorMethod = (error : unknown) =>{
     return new Error (`The Error is : ${error as unknown as string}`);
}


//adding underscore before mandatory unused parameter, will make the console ignore it, which is what we want here.
const indexUsers = async (_req : Request, res: Response)=>{
    try {
        const result = await user.index();
        res.json(result);
    } catch (error) {
        throw errorMethod(error);
    }
}

const showUsers = async (req : Request, res: Response) =>{
    try {
        const result = await user.show(parseInt(req.params.id));
        res.json(result);
    } catch (error) {
        throw errorMethod(error);
    }
}

const destroyUsers = async (req : Request, res: Response) =>{
    try {
        const result = await user.destroy(parseInt(req.params.id));
        res.json(result);
    } catch (error) {
        throw errorMethod(error);
    }
}

const createUsers = async(req : Request, res: Response) =>{
    try {
        const userInfo: Users = {
            f_name : req.body.f_name,
            l_name : req.body.l_name,
            user_name : req.body.user_name,
            password : req.body.password,
            age : req.body.age
        }
        const result = await user.create(userInfo);
        res.json(result);
    } catch (error) {
        throw errorMethod(error);
    }
}

//authenticateUser method will return the hashed password if the user_name and the original password is correct as a checking on our values
const authenticateUser = async (req : Request, res: Response)=>{
    try {
        const result = await user.authenticate(req.body.user_name, req.body.password)
        res.json(result);
    } catch (error) {
        throw errorMethod(error);
    }

}

export const usersRoutes = (app: express.Application) => {
    app.get('/showAllUsers',auth , indexUsers)
    app.get('/showOneUser/:id',auth , showUsers)
    app.delete('/deleteUser/:id',auth , destroyUsers)
    app.post('/createUser',auth , createUsers)
    app.get('/auth',auth , authenticateUser)
}