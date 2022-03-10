//this file will contain the SQL class models for users table.

import client from '../database';

//import dotenv to use variable from .env file for hashing and salt, and grant access to process.env object
import dotenv from 'dotenv';
dotenv.config();

//import jwt method to create JWT with it
import jwt, { Secret } from 'jsonwebtoken';

// import { parseJwtObject } from '../services/authenticate';


//import bcrypt package to be used i n hashing and comparing passwords with hashed ones
import bcrypt from 'bcrypt';

//get the necessary vars from .env file for hashing;
const { SALT_NO, BCRYPT_PASS, TOKEN_PASS } = process.env;

export type Users = {
  //add ? after id to make it optional, because not all variable of type 'Users' will add 'id' because it's added automatically by the DB
  id?: number;
  f_name: string;
  l_name: string;
  user_name: string;
  password: string;
  age: number;
};

//all elements of this type will be optional, because when user want to update his data he might not want to update all his data so they have to be optional to not cause errors with TS undefined error
export type updateUsers = {
  //add ? after id to make it optional, because not all variable of type 'Users' will add 'id' because it's added automatically by the DB
  id?: number;
  f_name?: string;
  l_name?: string;
  user_name?: string;
  password?: string;
  age?: number;
}

//use this method for error handling instead of copy past at every line.
const errorMethod = (error: unknown) => {
  return new Error(`The Error is : ${error as unknown as string}`);
};

export class Users_handler {
  async index(): Promise<Users[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users;`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw errorMethod(error);
    }
  }

  async show(id: number): Promise<Users> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE id = ($1);`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      // throw new Error(`Error from Users table SHOW method : ${error}`)
      throw errorMethod(error);
    }
  }

  async destroy(id: number): Promise<Users> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM users WHERE id = ($1) RETURNING *;`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw errorMethod(error);
    }
  }

  //make this function return string, because it returns a token
  async create(u: Users): Promise<string> {
    try {
      const conn = await client.connect();
      //return only the id so I can embed it to my token, so I can see the id and use it later with creating new order
      // dont ever add sensitive information to the token, because it can be easially decoded.
      const sql = `INSERT INTO users(f_name, l_name, user_name, password, age) VALUES ($1, $2, $3, $4, $5) RETURNING id;`;

      //hash variable will contain the return of bcrypt.hashSync() which will be the final hashed password with salting too, and its not asynchronous.
      //bcrypt.hashSync(userInputPassword + bcryptPassFromEnvFile  ,  NoOfHashingRounds)
      const hash = bcrypt.hashSync(
        u.password + BCRYPT_PASS,
        parseInt(SALT_NO as string)
      );

      //in the variables use 'hash' instead of the user input password
      const result = await conn.query(sql, [
        u.f_name,
        u.l_name,
        u.user_name,
        hash,
        u.age,
      ]);

      //This will return a token for this user, we can use it later to verify the user.
      const token = jwt.sign({ user: result.rows[0] }, TOKEN_PASS as string);

      //return an object like this { user: { id: 4 }, iat: 1646849670 }
      // const decoded = jwt.decode(token)

      // const decoded: string = jwt.verify(token,  process.env.TOKEN_PASS as string);
      // //trying to access id object from within decoded return
      // const idDecoded = decoded.id

      // const jwtDecode = jwt_decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0fSwiaWF0IjoxNjQ2ODQ5NjcwfQ.nCxL_2_bOwSh8LwuOMI3cIWbdqTO5HvMGMPpyGUrFDI")

      // const v = parseJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0fSwiaWF0IjoxNjQ2ODQ5NjcwfQ.nCxL_2_bOwSh8LwuOMI3cIWbdqTO5HvMGMPpyGUrFDI")
      // // console.log(`payload : ${parseJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0fSwiaWF0IjoxNjQ2ODQ5NjcwfQ.nCxL_2_bOwSh8LwuOMI3cIWbdqTO5HvMGMPpyGUrFDI")}`);

      // console.log(decoded)
      conn.release();

      return token;
    } catch (error) {
      throw errorMethod(error);
    }
  }

  //"authenticate" method will take "user_name" and "password" then check 1)if the "user_name" is valid, 2)password  is matched with the hashed one inside the DB, 3)user_name and password is a pair.
  async authenticate(
    user_name: string,
    password: string
  ): Promise<Users | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT password FROM users WHERE user_name = ($1);`;

      const result = await conn.query(sql, [user_name]);

      if (result.rows.length) {
        const user = result.rows[0];

        const match = bcrypt.compareSync(
          password + BCRYPT_PASS,
          result.rows[0].password
        );

        if (match) {
          return user.password;
        }
      }
      return null;
    } catch (error) {
      throw errorMethod(error);
    }
  }

  //method to update user info after passing user new data and the token in the body, but this method will not update the password
  async update(u: updateUsers): Promise<Users> {
    // Eng: Tarek El-Barody  helped me with this idea of optional update attributes.
    //I want to give the user the ability to update only the attributes he want to update, so I need to create SQL query that changes based on user input .
    //in this try/catch I check for every user attribute I can change if the user passed or not, if he passed this attribute then I append it to attribute array to be used as SQL parameters in "result" step and attach it to "innerSQL" which is the main part of our query that changes based on user input.

    try {
      const userAttributes = [];
      //we will add to that to be added to sql query
      let innerSql = '';
      //counter will help with place holders number
      let count = 0;

      if(u.f_name){
        //increment count, to be used with place holders
        count++;
        //push to "userAttributes" array, to be used later for sql parameter array
        userAttributes.push(u.f_name);
        innerSql += 'f_name=$' + count + ','
      }

      if(u.l_name){
        count++;
        userAttributes.push(u.l_name);
        innerSql += 'l_name=$' + count + ','
      }
      if(u.age){
        count++;
        userAttributes.push(u.age);
        innerSql += 'age=$' + count + ','
      }
      if(u.user_name){
        count++;
        userAttributes.push(u.user_name);
        innerSql += 'user_name=$' + count + ','
      }
      // count++;
      // innerSql += 'id=$' + count +',';

      if(count >= 1){
        innerSql = innerSql.slice(0, innerSql.length -1);

        const sql = 'UPDATE users SET ' + innerSql + 'WHERE id = 3 RETURNING *;';
        const conn = await client.connect();
        const result = await conn.query(sql, userAttributes);
        conn.release();
        return result.rows[0];
      }else {
        throw new Error(
          `There is no data to update is provided`
        );
      }
      // const sql = `UPDATE users SET f_name = ($1), l_name = ($2), user_name = ($3), password = ($4), age = ($5) WHERE id = ($6) RETURNING *;`;
      
    } catch (error) {
      throw errorMethod(error);
    }
  }
}
