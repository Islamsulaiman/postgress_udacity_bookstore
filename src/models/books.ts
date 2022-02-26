//import the pool instance from database.ts
import client from "../database";

//create a type for the response from the Book_handlers methods according to the database requirements
export type book = {
    id : number ,
    title : string,
    total_pages : number,
    author : string,
    type : string,
    summary : string
}



// //create the sql class
// export class Book_handlers {
    
// }