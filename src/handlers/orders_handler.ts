// // this file will handle all of the orders methods to the target route
import { orders_handler } from "../models/orders";

const orders = new orders_handler();

import express, {Request, Response} from "express";

//use this method for error handling instead of copy past at every line.
const errorMethod = (error : unknown) =>{
     return new Error (`The Error is : ${error as unknown as string}`);
}

//to handle the adding new order functionality
const addOrdersRoute = async (req: Request, res: Response) => {
    const order_id : number = req.params.id as unknown as number;
    const product_id : number = req.body.product_id;
    const quantity : number = req.body.quantity;
    try {
        const result = await orders.addOrder(quantity, order_id, product_id)
    } catch (error) {
        throw errorMethod(error)
    }
};


export const ordersRoute = (app: express.Application) => {
    app.post("/order/:id")
}

