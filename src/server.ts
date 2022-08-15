import App from './app';
import UsersController from './modules/users/users.controller';

const app = new App(
  [
    new UsersController(),
  ],
);

app.listen();
