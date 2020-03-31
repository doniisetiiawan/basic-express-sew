import passport from '../passport';
import User from '../models/user';

// eslint-disable-next-line no-unused-vars
export function showRegistrationForm(req, res, next) {
  res.send('register');
}

export function createUser(req, res, next) {
  User.register(
    req.body.email,
    req.body.password,
    (err, user) => {
      if (err) return next(err);
      req.login(user, (err) => {
        if (err) return next(err);
        res.redirect('/');
      });
    },
  );
}

// eslint-disable-next-line no-unused-vars
export function showLoginForm(req, res, next) {
  res.send('login');
}

export const createSession = passport.authenticate(
  'local',
  {
    successRedirect: '/',
    failureRedirect: '/users/login',
  },
);
