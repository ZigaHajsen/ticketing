import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  const defaultError = [{ message: 'Something went wrong' }];

  res.status(500).send({
    errors: defaultError,
  });
};
