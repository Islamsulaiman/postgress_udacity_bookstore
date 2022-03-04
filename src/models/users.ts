//this file will contain the SQL class models for users table.

import client from "../database";

//import dotenv to use variable from .env file for hashing and salt, and grant access to process.env object
import dotenv from 'dotenv'; 
dotenv.config();

//import jwt method to create JWT with it
import jwt, { Secret } from 'jsonwebtoken';


//import bcrypt package to be used i n hashing and comparing passwords with hashed ones
import bcrypt from 'bcrypt';

//get the necessary vars from .env file for hashing;
const {SALT_NO, BCRYPT_PASS, TOKEN_PASS} = process.env;

export type Users = {
    //add ? after id to make it optional, because not all variable of type 'Users' will add 'id' because it's added automatically by the DB
    id? : number,
    f_name : string,
    l_name : string,
    user_name : string,
    password : string, 
    age : number
}

// const errorMethod = (methodName : string, error : unknown) =>{
//      throw new Error (`Error from Users table, ${methodName} method : ${error as unknown as string}`);
// }


export class Users_handler {
    async index () : Promise<Users[]> {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM users;`
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Error from Users table INDEX method : ${error}`)
            // errorMethod('index', error)
        }
    }

    async show(id: number) : Promise<Users>{
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM users WHERE id = ($1);`
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error from Users table SHOW method : ${error}`)
        }
    }

    async destroy(id: number): Promise<Users> {
        try {
            const conn = await client.connect();
            const sql = `DELETE FROM users WHERE id = ($1) RETURNING *;`
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error from Users table DELETE method : ${error}`)
        }
    };

    //make this function return string, because it returns a token
    async create(u : Users): Promise<string> {
        try {
            const conn = await client.connect();
            const sql = `INSERT INTO users(f_name, l_name, user_name, password, age) VALUES ($1, $2, $3, $4, $5) RETURNING user_name, password;`;

            //hash variable will contain the return of bcrypt.hashSync() which will be the final hashed password with salting too, and its not asynchronous.
            //bcrypt.hashSync(userInputPassword + bcryptPassFromEnvFile  ,  NoOfHashingRounds)
            const hash = bcrypt.hashSync(u.password + BCRYPT_PASS , parseInt(SALT_NO as string));

            //in the variables use 'hash' instead of the user input password
            const result = await conn.query(sql, [u.f_name, u.l_name, u.user_name, hash, u.age]);

            //This will return a token for this user, we can use it later to verify the user.
            const token =  jwt.sign({user: result.rows[0]}, TOKEN_PASS as string);

            conn.release();

            return token;
        } catch (error) {
            throw new Error(`Error from Users table CREATE method : ${error}`)
        }
    };

    //"authenticate" method will take "user_name" and "password" then check 1)if the "user_name" is valid, 2)password  is matched with the hashed one inside the DB, 3)user_name and password is together. 
    async authenticate(user_name: string, password : string): Promise<Users | null>  {
        try {
            const conn = await client.connect();
            const sql = `SELECT password FROM users WHERE user_name = ($1);`

            const result = await conn.query(sql, [user_name]);

            if(result.rows.length){

                const user = result.rows[0];
                
                const match = bcrypt.compareSync(password + BCRYPT_PASS  , result.rows[0].password);
                
                if(match){
                    return user.password;
                }
            }
            return null;
        } catch (error) {
            throw new Error(`Error from Users table AUTHENTICATE method : ${error}`)
        }
    }
};