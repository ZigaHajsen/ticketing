import express from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors';
import { errorHandler } from './middlewares';
import {
  currentUserRouter,
  signinRouter,
  signupRouter,
  signoutRouter,
} from './routes';

const app = express();

app.use(express.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
