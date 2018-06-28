const { ObjectID } = require('mongodb');
const { User } = require('./../models/user');

module.exports = {
  register(req, res) {
    const values = req.body;
    const user = new User(values);
    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).status(201).send({
        status: 'oke',
        message: 'register success',
      });
    }).catch((e) => {
      res.status(400).send({
        status: 'error',
        message: e.message,
      });
    })
  },

  findMe(req, res) {
    res.status(200).send({
      status: 'oke',
      user: req.user
    });
  },

  login(req, res) {
    let values = req.body;
    User.findByCredentials(values.email, values.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        const userSendData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
        res.header('x-auth', token).status(200).send({
          status: 'oke',
          user: userSendData,
          message: 'login success',
        })
      })
    }).catch((e) => {
      res.status(400).send({
        status: 'error',
        message: 'login failed',
      });
    })
  },
   
  logout(req, res) {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send({
        status: 'oke',
        message: 'logout success',      
      })
    }).catch((e) => {
      res.status(400).send({
        status: 'error',
        message: 'logout failed',
      })
    })
  }
}