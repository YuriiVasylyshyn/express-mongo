import express, { type Application, json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import errorMiddleware from './middlewares/exception.middleware';

import type { Controller } from './interfaces';

dotenv.config();

export default class App {

  public app: Application;
  public port: string | number;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.port = process.env.PORT ?? 3000;

    this._connectToTheDatabase();
    this._initializeMiddlewares();
    this.initializeErrorHandling();
    this._initializeControllers(controllers);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running at http://localhost:${this.port}`);
    });
  }

  private _initializeMiddlewares(): void {
    this.app.use(json());
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  private _initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use(`/api/v1/${controller.path}`, controller.router);
    });
  }

  private async _connectToTheDatabase(): Promise<void> {
    const {
      DB_USER,
      DB_PASSWORD,
      DB_URL,
    } = process.env;

    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}${DB_URL}`);
  }

}
