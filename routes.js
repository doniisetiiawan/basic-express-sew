import {
  showRegistrationForm,
  createUser,
  showLoginForm,
  createSession,
  getProfile,
  logout,
} from './controllers/user';
import restrictedLoggedInUser from './controllers/middleware';

export default (app) => {
  app.get('/users/register', showRegistrationForm);
  app.post('/users/register', createUser);
  app.get('/users/login', showLoginForm);
  app.post('/users/login', createSession);
  app.get('/users/logout', logout);
  app.get('/users/:id', restrictedLoggedInUser, getProfile);
};
