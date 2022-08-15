import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import type { Controller } from './interfaces';

dotenv.config();

export class App {

  public app: express.Application;
  public port: string | number;

  constructor(controllers: Controller[]) {
    dotenv.config();

    this.app = express();
    this.port = process.env.PORT ?? 3000;

    this._initializeMiddlewares();
    this._initializeControllers(controllers);
    this._connectToDB();
  }

  private _initializeMiddlewares(): void {
    this.app.use(json());
  }

  private _initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private async _connectToDB(): Promise<void> {
    const {
      DB_USER,
      DB_PASSWORD,
      DB_URL,
    } = process.env;

    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}${DB_URL}`);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running at http://localhost:${this.port}`);
    });
  }

}
