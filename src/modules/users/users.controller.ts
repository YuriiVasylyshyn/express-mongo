import { Router, type Request, type Response } from 'express';
import { GetUserDto } from './dtos/get-user.dto';
import userModel, { type User } from './models/user.model';

import type { CreateUserDto } from './dtos/create-user.dto';
import type { Controller } from '../../interfaces';

export default class UsersController implements Controller  {

  public router = Router();

  constructor(public path: string) {
    this._intializeRoutes();
  }

  private _intializeRoutes(): void {
    this.router.get('/', this.getAllUsers);
    this.router.post('/post', this.addUser);
  }

  public async getAllUsers(_request: Request, response: Response): Promise<void> {
    const res: User[] = await userModel.find();
    response.send(res);
  }

  public async addUser(request: Request, response: Response): Promise<void> {
    const res = request.body as CreateUserDto;

    const user = await new userModel({
      ...res,
    }).save();

    const userData = new GetUserDto();

    userData.id = user.id as string;
    userData.firstName = user.firstName;
    userData.lastName = user.lastName;

    response.send(userData);
  }

}
