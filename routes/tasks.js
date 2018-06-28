const express = require('express');
const router = express.Router();
const { authenticate } = require('./../lib/auth');
const { create, find, findOne, update, destroy } = require('./../controllers/task');

router.post('/', authenticate, create);
router.get('/', authenticate, find);
router.get('/:id', authenticate, findOne);
router.patch('/:id', authenticate, update);
router.delete('/:id', authenticate, destroy);

module.exports = router;