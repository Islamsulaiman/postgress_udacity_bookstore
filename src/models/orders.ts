//this file will contain the class methods for orders table and order_products table
//we want to show all orders, delete, add new order


import client from "../database";

//import dotenv to use variable from .env file for hashing and salt, and grant access to process.env object
import dotenv from 'dotenv'; 
import { isEntityName } from "typescript";
dotenv.config();

//use this method for error handling instead of copy past at every line.
const errorMethod = (error : unknown) =>{
     return new Error (`The Error is : ${error as unknown as string}`);
}

//type for the response of "orders" table for a specific user that is the logged in one.
export type Orders = {
    id? : number,
    status : string,
    user_id : number
}

//type for the new created orders to order_product table
export type Orders_product = {
    quantity: number,
    order_id : number,
    product_id : number
}

//this the class that will contain
export class orders_handler {
    async index(): Promise<Orders[]> {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM orders;`;
            const result = await client.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw errorMethod(error)
        }
    };

    async show( id : number) : Promise<Orders> {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM orders WHERE id = $1 RETURNING *;`
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw errorMethod(error)
        }
    }

    //this method will add orders to orders_products table to create many to many relation between orders and products tables.
    async addOrder(quantity: number, order_id : number, product_id: number) : Promise<Orders_product>{
        try {
            const conn = await client.connect();
            const sql = `INSERT INTO orders_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *;`;
            const result = await client.query(sql, [quantity, order_id, product_id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw errorMethod(error);
        }
    }
    

}
