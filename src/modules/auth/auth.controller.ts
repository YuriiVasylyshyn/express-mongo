import { Router } from 'express';
import { login, logout, signup } from './auth.service';
import validationMiddleware from '../../middlewares/validation.middleware';
import { SignUpDto } from './dtos/signup.dto';

import type { Controller } from '../../interfaces';

export default class AuthController implements Controller  {

  public router = Router();

  constructor(public path: string) {
    this._intializeRoutes();
  }

  private _intializeRoutes(): void {
    this.router.post('/signup', validationMiddleware(SignUpDto), signup);
    this.router.post('/login', login);
    this.router.post('/logout', logout);
  }

}
