import session from 'express-session';
import MongoStore from 'connect-mongo';

import type { Request, Response, NextFunction } from 'express';

function sessionMiddleware(request: Request, response: Response, next: NextFunction): void {
  const {
    DB_USER,
    DB_PASSWORD,
    DB_URL,
  } = process.env;

  return session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${DB_USER}:${DB_PASSWORD}${DB_URL}`,
      collectionName: 'sessions',
    }),
  })(request, response, next);
}

export default sessionMiddleware;
