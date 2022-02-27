// // in this file we are trying to create four methods four the CRUD operations on the database

//import the pool instance from database.ts
import client from '../database';

//create a type for the response from the Book_handlers methods according to the database requirements
export type Book = {
    id : number ,
    title : string,
    total_pages : number,
    author : string,
    type : string,
    summary : string
}



//create the sql class which will contain all the CRUD sql methods
export class Book_handlers {
    //create method that read all the rows of DB
    //the promise type array of Book because we want to get all the rows from books table, which will return multiple elements of strings
    async index () : Promise<Book[]> {
        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM books";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error (`The error is ${error}`)
        }
    }
    // create delete sql to delete a row based on id;
    async delete (id : number) : Promise<Book>{
        try {
            const conn = await client.connect();
            const sql = `DELETE FROM books WHERE id = ($1) RETURNING *`;
            const result = await conn.query(sql, [id]);
            const book = result.rows[0];
            conn.release();
            return book;            
        } catch (error) {
            throw new Error (`The error is ${error}`)
        }
    }
    // create insert sql to insert a row to the table
    // 'b' is an object containing all the query data
    async insert ( b : Book ): Promise<Book>{
        try {
            const conn = await client.connect();
            // add $1, $2 ... as a place holder for the actual values to insert 
            //'RETURNING *' this clause will final line that will be inserted to the DB so we could check what is the final line added, we could use it with DELETE and update too.
            const sql = `INSERT INTO books (title ,total_pages ,author , type, summary) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            //add sql as a 1st arg , then add an array of the target values from the object Book.
            const result = await conn.query(sql, [b.title, b.total_pages, b.author, b.type, b.summary]);
            //save the 1st element from the array returned from "result" variable. 
            const book = result.rows[0];
            conn.release();   
            return book; 
            
        } catch (error) { 
            throw new Error (`The error is ${error}`)
        }
    }
    //create a methods to show a row based on id
    async show (id : number) : Promise<Book>{
        try {
            const conn = await client.connect();
            // here I'am placing the value with ($1, $2, $3 ....) to delete against injection attacks
            const sql = `SELECT * FROM books WHERE id = ($1)`;
            // I'am adding a second argument here to substitute the '?' from the sql query up
            const result = await conn.query(sql, [id]);
            conn.release(); 
            // result.rows will always return an array, even if I'am only returning one value it will return an array of one value, so I should index[0] to it.
            return result.rows[0]; 
            
        } catch (error) {
            throw new Error (`The error is ${error}`)
        }
    }
}