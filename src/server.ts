import App from './app';
import AuthController from './modules/auth/auth.controller';
import UsersController from './modules/users/users.controller';

const app = new App(
  [
    new AuthController('auth'),
    new UsersController('users'),
  ],
);

app.listen();
