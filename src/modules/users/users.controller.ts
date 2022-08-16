import { Router } from 'express';
import { getAllUsers } from './users.service';

import type { Controller } from '../../interfaces';

export default class UsersController implements Controller  {

  public router = Router();

  constructor(public path: string) {
    this._intializeRoutes();
  }

  private _intializeRoutes(): void {
    this.router.get('/', getAllUsers);
  }

}
