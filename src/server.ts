import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

//import route handlers
import { index_route } from './handlers/book_handlers';

const app: express.Application = express();

//dont add type for this variable because it's already initialized with string value and typescript can
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

index_route(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
