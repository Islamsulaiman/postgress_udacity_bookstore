// // this file will handle all of the orders methods to the target route
import { Orders, orders_handler } from '../models/orders';

const orders = new orders_handler();

import express, { Request, Response } from 'express';

//use this method for error handling instead of copy past at every line.
const errorMethod = (error: unknown) => {
  return new Error(`The Error is : ${error as unknown as string}`);
};

//show all orders in the DB, with their status
const showAllOrders = async (_req: Request, res: Response) => {
  try {
    const result = await orders.index();
    res.json(result);
  } catch (error) {
    throw errorMethod(error);
  }
};

const showOneOrder = async (req: Request, res: Response) => {
  try {
    const result = await orders.show(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    throw errorMethod(error);
  }
};

//to handle creating new orders for the user to add products to them later
const createOrderHandler = async (req: Request, res: Response) => {
  const orderObject: Orders = {
    status: req.body.status,
    user_id: req.body.user_id,
  };

  try {
    const result = await orders.create(orderObject);
    res.json(result);
  } catch (error) {
    // throw errorMethod(error)
    res.send('make sure that you a valid user_id');
  }
};

//to handle the adding new order functionality
const addProductToOrder = async (req: Request, res: Response) => {
  const order_id: number = parseInt(req.params.id);
  const product_id: number = req.body.product_id;
  const quantity: number = req.body.quantity;
  try {
    const result = await orders.addOrder(quantity, order_id, product_id);
    res.json(result);
  } catch (error) {
    // throw errorMethod(error)
    res.send(
      'please make sure that product is available and the order is open !!'
    );
  }
};

export const ordersRoute = (app: express.Application) => {
  app.get('/order', showAllOrders);
  app.get('/oneOrder/:id', showOneOrder);
  app.post('/createOrder', createOrderHandler);
  app.post('/order/:id/product', addProductToOrder);
};
