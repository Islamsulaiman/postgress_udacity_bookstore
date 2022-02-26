// // in this file we are trying to create four methods four the CRUD operations on the database

//import the pool instance from database.ts
import client from "../database";

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
    async delete (id : number) : Promise<void>{
        try {
            const conn = await client.connect();
            const sql = `DELETE FROM books WHERE id = ${id}`;
            const result = await conn.query(sql);
            conn.release();            
        } catch (error) {
            throw new Error (`The error is ${error}`)
        }
    }
    // create insert sql to insert a row to the table
    async insert ( title : string,total_pages : number,author : string,type : string,summary : string): Promise<void>{
        try {
            const conn = await client.connect();
            const sql = `INSERT INTO books (title ,total_pages ,author ,type,summary) VALUES (${title}, ${total_pages}, ${author}, ${type}, ${summary})`;
            const result = await conn.query(sql);
            conn.release();    
            
        } catch (error) { 
            throw new Error (`The error is ${error}`)
        }
    }
    //create a methos to show a row based on id
    async show (id : number) : Promise<Book>{
        try {
            const conn = await client.connect();
            // here I'am placing the value with '?' to defete againest injection attacks
            const sql = `SELECT * FROM books WHERE id = ?`;
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