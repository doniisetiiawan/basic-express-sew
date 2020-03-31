import { showRegistrationForm, createUser, showLoginForm, createSession } from './controllers/user';

export default (app) => {
  app.get('/users/register', showRegistrationForm);
  app.post('/users/register', createUser);
  app.get('/users/login', showLoginForm);
  app.post('/users/login', createSession);
};
