//this file will contain the class methods for orders table
//we want to show all orders, delete, add new order


import client from "../database";

//import dotenv to use variable from .env file for hashing and salt, and grant access to process.env object
import dotenv from 'dotenv'; 
dotenv.config();

//type for the response of "orders" table.
export type Orders = {
    id? : number,
    status : string,
    user_id : number
}

// //this the class that will contain
// export class orders_handler {
//     async index(): Promise<Orders> {
//         try {
            
//         } catch (error) {
            
//         }
//     }

// }
