import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

//import route handlers
import { index_route } from './handlers/book_handlers';

//import the routes for the users to connect to the DB with
import { usersRoutes } from './handlers/users_handlers';


const app: express.Application = express();

//dont add type for this variable because it's already initialized with string value and typescript can
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

//use usersRoutes method which contain all the methods and routes for the users to configure them
app.use('/',usersRoutes);

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

index_route(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
