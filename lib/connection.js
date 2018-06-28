const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, function (err) {
  if (err) return console.log('Botler db failed to connect!');
  console.log('Botler db connected!');
});

module.exports = { mongoose };