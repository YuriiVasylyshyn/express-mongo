import type { NextFunction, Request, Response } from 'express';

export class HttpException extends Error {

  public status: number;
  public override message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }

}

function errorMiddleware(error: HttpException, _request: Request, response: Response, _next: NextFunction): void {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({
    status,
    message,
  });
}

export default errorMiddleware;
