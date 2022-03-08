import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

//import route handlers
import { products_route } from './handlers/product_handlers';

//import the routes for the users to connect to the DB with
import { usersRoutes } from './handlers/users_handlers';

//import the route to control orders.
import { ordersRoute } from './handlers/orders_handler';


const app: express.Application = express();

//dont add type for this variable because it's already initialized with string value and typescript can
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

//to grant me access to the books table inside the DB
products_route(app);

//to grant me access to the users table inside the DB
usersRoutes(app);

//to grant me access to orders and orders_products table
ordersRoute(app);


app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
