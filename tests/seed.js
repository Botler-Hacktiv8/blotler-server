const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const userId_1 = new ObjectID();
const userId_2 = new ObjectID();

const dummyUser = [
  {
    _id: userId_1,
    firstName: 'user123',
    lastName: 'user123',
    email: 'user123@gmail.com',
    password: 'user123',
    tokens: [{
      access: 'auth',
      token: jwt.sign({
        _id: userId_1,
        email: 'user123@gmail.com',
        access: 'auth', 
        }, 'BOTLERSECRET').toString()
    }],
  },
  {
    _id: userId_2,
    firstName: 'user125',
    lastName: 'user125',
    email: 'user125@gmail.com',
    password: 'user125',
    tokens: [{
      access: 'auth',
      token: jwt.sign({
        _id: userId_2,
        email: 'user125@gmail.com',
        access: 'auth', 
        }, 'BOTLERSECRET').toString()
    }],
  }
];

module.exports = {
  dummyUser,
}