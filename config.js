const config = {
  development: {
    db_url: 'mongodb://localhost/basic-express-sew',
    sessionDb: 'mongodb://localhost/basic-express-sew',
    domain: 'localhost',
  },
};

export default () => config[process.env.NODE_ENV || 'development'];
