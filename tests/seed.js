const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const userId_1 = new ObjectID();
const userId_2 = new ObjectID();

const dummyUser = [
  {
    _id: userId_1,
    firstName: 'Iswanul',
    lastName: 'Umam',
    email: 'umam@gmail.com',
    password: '@Umam123',
    tokens: [{
      access: 'auth',
      token: jwt.sign({
        _id: userId_1,
        username: 'user123',
        email: 'user123@gmail.com',
        access: 'auth', 
        }, 'BOTLERSECRET').toString()
    }],
  },
  {
    _id: userId_2,
    username: 'user125',
    email: 'user125@gmail.com',
    password: 'user125',
    tokens: [{
      access: 'auth',
      token: jwt.sign({
        _id: userId_2,
        username: 'user125',
        email: 'user125@gmail.com',
        access: 'auth', 
        }, process.env.JWT_SECRET).toString()
    }],
  }
];

module.exports = {
  dummyUser,
}