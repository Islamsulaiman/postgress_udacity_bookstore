// // in this file we are trying to create four methods four the main CRUD operations on the database

//import the pool instance from database.ts, we will use it as a connection between the DB and our node file.
import client from '../database';

//create a type for the response from the Book_handlers class methods according to the database requirements and the table schema
export type Book = {
  //add ? after id to make it optional, because not all variable of type 'Users' will add 'id' because it's added automatically by the DB
  id?: number;
  title: string;
  total_pages: number;
  author: string;
  type: string;
  summary: string;
};

//create the sql class which will contain all the CRUD sql methods
export class Book_handlers {
  //create method that read all the rows of DB
  //the promise type of Book is array, because we want to get all the rows from books table, which will return multiple object inside array.
  async index(): Promise<Book[]> {
    try {
      //conn is the connection key to perform every task.
      const conn = await client.connect();
      //this is the SQL command
      const sql = 'SELECT * FROM books';
      //using 'conn' and '.query()' method, wew are trying to create asynchronous query with the DB.
      const result = await conn.query(sql);
      //use '.release()' to close the connection between DB and node, very important for security.
      conn.release();
      //result.rows' will parse the promise array resulting from index() method
      return result.rows;
    } catch (error) {
      //we should use 'throw new Error()' as error handling
      throw new Error(`The error is ${error}`);
    }
  }
  // create delete sql to delete a row based on id;
  async delete(id: number): Promise<Book> {
    try {
      const conn = await client.connect();
      //we are using '$1, $2 ... ' as a place holder to prevent injection attack.
      const sql = `DELETE FROM books WHERE id = ($1) RETURNING *`;
      // add second argument to '.query()' which is an array of the placeholders in our query chronologically ordered.
      const result = await conn.query(sql, [id]);
      //our query will return an array with only one object as an element with the specified 'id', so we are indexing this one object into 'book' variable.
      const book = result.rows[0];
      conn.release();
      return book;
    } catch (error) {
      throw new Error(`The error is ${error}`);
    }
  }
  // create insert sql to insert a row to the table
  // 'b' is an object containing all the query data
  async create(b: Book): Promise<Book> {
    try {
      const conn = await client.connect();
      // add $1, $2 ... as a place holder for the actual values to insert
      //'RETURNING *' this clause will return the final line that will be inserted to the DB to 'result' variable, so we could check what is the final line added, we could use it with DELETE and update too.
      const sql = `INSERT INTO books (title ,total_pages ,author , type, summary) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      //add sql as a 1st arg , then add an array of the target values from the object Book.
      const result = await conn.query(sql, [
        b.title,
        b.total_pages,
        b.author,
        b.type,
        b.summary,
      ]);
      //save the 1st element from the array returned from "result" variable.
      const book = result.rows[0];
      conn.release();
      return book;
    } catch (error) {
      throw new Error(`The error is ${error}`);
    }
  }
  //create a methods to show a row based on id
  async show(id: number): Promise<Book> {
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
      throw new Error(`The error is ${error}`);
    }
  }
}
