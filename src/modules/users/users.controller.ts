import { Router, type Request, type Response } from 'express';
import { GetUserDto } from './dtos/get-user.dto';

import type { CreateUserDto } from './dtos/create-user.dto';

export default class UsersController {

  public path = '/users';
  public router = Router();

  private users: GetUserDto[] = [
    {
      id: 'id1',
      firstName: 'John',
      lastName: 'Smith',
    },
  ];

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes(): void {
    this.router.get(this.path, this.getAllUsers);
    this.router.post(this.path, this.addUser);
  }

  public getAllUsers(_request: Request, response: Response): void {
    response.send(this.users);
  }

  public addUser(request: Request, response: Response): void {
    const res = request.body as CreateUserDto;

    const user = new GetUserDto();

    user.id = `id${this.users.length + 1}`;
    user.firstName = res.firstName;
    user.lastName = res.lastName;

    this.users.push(user);
    response.send(user);
  }

}
