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

const dummyTask = [{
  _id: new ObjectID(),
  text: "This is the first tasks",
  timeStart: new Date(),
  timeEnd: new Date(),
  locationName: 'Pondok Indah Mall',
  address: 'Jalan Simatupang No. 1',
  _creator: userId_1
},{
  _id: new ObjectID(),
  text: "This is the secound tasks",
  timeStart: new Date(),
  timeEnd: new Date(),
  locationName: 'Pondok Indah Mall',
  address: 'Jalan Simatupang No. 1',
  _creator: userId_2
}];

module.exports = {
  dummyUser,
  dummyTask
}