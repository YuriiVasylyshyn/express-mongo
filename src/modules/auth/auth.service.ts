import passport from '../../middlewares/passport.middleware';
import UserModel, { type User } from '../../models/user.model';

import type { NextFunction, Request, Response } from 'express';
import type { SignUpDto } from './dtos/signup.dto';

export const signup = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { name, username, password } = req.body as SignUpDto;

  let user: User | null;

  user = await UserModel.findOne({ username });

  if (user) {
    res.status(403).json({
      statusCode: 403,
      message: 'User already exist',
    });
    return;
  }

  user = await UserModel.create({ name, username, password });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  req.login(user, (err) => {
    if (err) throw err;
    res.status(201).json(user);
  });
};

export const login = (req: Request, res: Response, next: NextFunction): void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  passport.authenticate('local', (_err, user, _info) => {
    if (!user) {
      res.status(401).json({
        statusCode: 401,
        message: 'Wrong credentials',
      });
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    req.login(user, (err) => {
      if (err) throw err;
      res.status(201).json(user);
    });
  })
  (req, res, next);
};

export const logout = (req: Request, res: Response, _next: NextFunction): void => {
  req.session.destroy((_err) => {
    res.clearCookie('connect.sid');
    res.status(204).end();
  });
};
