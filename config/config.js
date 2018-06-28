const ENV = process.env.NODE_ENV || 'development';

/* config for testing environment */
if (ENV == 'test') {
  process.env.MONGODB_URI = process.env.MONGODB_URI_TESTING;
}

// console.log('check env', process.env.MONGODB_URI);