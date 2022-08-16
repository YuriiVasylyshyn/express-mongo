import UserModel from '../../models/user.model';

import type { Request, Response, NextFunction } from 'express';
import type { User } from '../../models/user.model';

export const getAllUsers = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const data: User[] = await UserModel.find();

  // eslint-disable-next-line no-console
  console.log('Is loggedIn: ', req.isAuthenticated());
  // eslint-disable-next-line no-console
  console.log('User: ', req.user);
  res.send(data);
};
