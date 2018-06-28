const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://botler:botler123@ds121311.mlab.com:21311/botler-db', function (err) {
  if (err) return console.log('Botler db failed to connect!');
  console.log('Botler db connected!');
});

module.exports = { mongoose };