import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';

import configaro from './config';
import passport from './passport';
import routes from './routes';

const config = configaro();

mongoose.connect(config.db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();
const port = 3000;

app.use(cookieParser('Progressively'));
app.use(
  session({
    secret: 'Progressively',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send('Hello World!'));
routes(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
