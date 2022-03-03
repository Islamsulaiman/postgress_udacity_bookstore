import { Users, Users_handler } from "../models/users";

const user =new Users_handler();

import express, {Request, Response} from 'express';

const indexUsers = async (_req : Request, res: Response)=>{
    try {
        const result = await user.index();
        res.json(result);
    } catch (error) {
        throw new Error (`Error from user_handler file from indexUsers method : ${error}`)
    }
}

const showUsers = async (req : Request, res: Response) =>{
    try {
        const result = await user.show(req.body.id);
        res.json(result);
    } catch (error) {
        throw new Error (`Error from user_handler file from showUsers method : ${error}`)
    }
}

const destroyUsers = async (req : Request, res: Response) =>{
    try {
        const result = await user.destroy(req.body.id);
        res.json(result);
    } catch (error) {
        throw new Error (`Error from user_handler file from destroyUsers method : ${error}`)
    }
}

const createUsers = async(req : Request, res: Response) =>{
    try {
        const userInfo: Users = {
            f_name : req.body.fname,
            l_name : req.body.lname,
            user_name : req.body.username,
            password : req.body.password,
            age : req.body.age
        }
        const result = await user.create(userInfo);
        res.json(result);
    } catch (error) {
        throw new Error (`Error from user_handler file from createUsers method : ${error}`)
    }
}

const authenticateUser = async (req : Request, res: Response)=>{
    try {
        const result = await user.authenticate(req.body.username, req.body.password)
        res.json(result);
    } catch (error) {
        throw new Error (`Error from user_handler file from authenticateUser method : ${error}`)
    }

}

export const usersRoutes = (app: express.Application) => {
    app.get('/showAllBooks', indexUsers)
    app.get('/showOneUser/:id', showUsers)
    app.delete('/deleteUser/:id', destroyUsers)
    // app.post('/createUser', createUsers)
}