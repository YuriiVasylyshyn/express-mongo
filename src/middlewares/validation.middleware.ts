import { plainToInstance, type ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';
import { HttpException } from './exception.middleware';

import type { ValidationError } from 'class-validator';
import type { RequestHandler } from 'express';

export default function validationMiddleware<T>(
  type: ClassConstructor<T>,
  skipMissingProperties = false,
): RequestHandler {
  return (req, _res, next) => {
    validate(plainToInstance(type as unknown as ClassConstructor<string>, req.body), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => {
            if (error?.constraints) {
              return Object.values(error.constraints);
            } else {
              return ['Error'];
            }
          }).join(', ');
          next(new HttpException(400, message || 'Invalid data!'));
        } else {
          next();
        }
      });
  };
}
