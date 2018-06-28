const ENV = process.env.NODE_ENV || 'development';

/* config for testing environment */
if (ENV == 'test') {
  process.env.MONGODB_URI = 'mongodb://botler:botler123@ds221271.mlab.com:21271/botler-db-test';
}