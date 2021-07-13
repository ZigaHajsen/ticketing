import { Request, Response, NextFunction } from 'express';
import { DatabaseConnectionError, RequestValidationError } from '../errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map((error) => {
      return {
        message: error.msg,
        field: error.param,
      };
    });

    return res.status(400).send({ errors: formattedErrors });
  }

  if (err instanceof DatabaseConnectionError) {
    const formattedErrors = [
      {
        message: err.reason,
      },
    ];

    return res.status(500).send({ errors: formattedErrors });
  }

  const defaultError = [{ message: 'Something went wrong' }];

  res.status(500).send({
    errors: defaultError,
  });
};
