In this file we will see how to use all the API features.

# How to use the API

## Run API server

- within console run (npm run start) to start our server.
- I suggest you to use postman for better and easier interaction with the API.

## How to use

steps of using all functionality using postman

### User functionality

1. to create user :
   a. access (http://localhost:3000/createUser) as POST HTTP
   b. provide new user info as json body then send, like:
   {
   "f_name" : "test",
   "l_name" : "test",
   "user_name" : "test",
   "password" : "pass",
   "age" : 50
   }
   c. You will receive back your user token , this is your key for every functionality throw the API, so keep it safe.
   d. now you are a valid user (:

2. Login user with token to be able to access sensitive routes:

   a. from postman hit "Authorization".
   b. from types choose "Bearer token".
   c. In token box, enter your token that you were presented with when you created your account.
   d. now you are logged in>

3. Show all users:

   a. access (http://localhost:3000/showAllUsers) as GET HTTP
   b. You will be provided with all the users created in.
   c. you should be logged in.

4. Show one user:

   a. access (http://localhost:3000/showOneUser/:id) as GET HTTP EX => <http://localhost:3000/showOneUser/3> , id is the user id inside the DB.
   b. You will be provided with the user data.
   c. you should be logged in.

5.

### show all the users
