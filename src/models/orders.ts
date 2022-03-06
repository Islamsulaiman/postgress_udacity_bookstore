//this file will contain the class methods for orders table
//we want to show all orders, delete, add new order


import client from "../database";

//import dotenv to use variable from .env file for hashing and salt, and grant access to process.env object
import dotenv from 'dotenv'; 
dotenv.config();

//use this method for error handling instead of copy past at every line.
const errorMethod = (error : unknown) =>{
     return new Error (`The Error is : ${error as unknown as string}`);
}

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
