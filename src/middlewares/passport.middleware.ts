import passport from 'passport';
import UserModel from '../models/user.model';
import { Strategy as LocalStrategy } from 'passport-local';

import type { Request } from 'express';

passport.use(
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    const user = await UserModel.findOne({ username });

    if (!user) { done(null, false); }

    if (user && user.password === password) {
      done(null, user);
    } else {
      done(null, false);
    }
  },
  ),
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  done(null, user._id);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser(async (_request: Request, id: string, done: any) => {
  try {
    const user = await UserModel.findById(id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    done(null, user);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    done(error);
  }
});

export default passport;

