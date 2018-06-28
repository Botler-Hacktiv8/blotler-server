const express = require('express');
const router = express.Router();
const { authenticate } = require('./../lib/auth');
const { register, findMe, login, logout } = require('./../controllers/user');

router.post('/register', register);
router.get('/me', authenticate, findMe);
router.post('/login', login);
router.delete('/logout', authenticate, logout);
// router for test
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
