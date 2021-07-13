import express from 'express';
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

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
