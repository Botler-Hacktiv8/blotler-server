const { ObjectID } = require('mongodb');
const { Task } = require('./../models/task');

module.exports = {
  /**
   * Function create().
   *
   * Function create task
   *
   */
  create(req, res) {
    const values = req.body;
    const payload = {
      ...values,
      _creator: req.user._id
    };
    const task = new Task(payload);
    task.save().then(task => {
      res.status(201).send({
        status: 'oke',
        task: task,
        message: 'Success craete task!',
      });
    }).catch((e) => {
      res.status(400).send({
        status: 'error',
        message: e.message,
      });
    });
  },
  /**
   * Function find().
   *
   * Function find all tasks
   *
   */
  find(req, res) {
    Task.find({ _creator: req.user._id })
      .then((result) => {
        res.status(200).send({
          status: 'oke',
          tasks: result,
          message: 'Success find taks!'
        });
      })
      .catch((e) => {
        res.status(400).send({
          status: 'error',
          message: e.message,
        });
      });
  },
  /**
   * Function findOne().
   *
   * Find one task
   *
   */
  findOne(req, res) {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(404).send({
        status: 'error',
        message: 'task not found',
      });
    }

    Task.findOne({
      _id: id,
      _creator: req.user._id
    }).then((result) => {
      if (!result) {
        return res.status(404).send({
          status: 'error',
          message: 'task not found',
        });
      }
      res.status(200).send({
        status: 'oke',
        task: result,
        message: 'Success get task!'
      });
    }).catch((e) => {
      res.status(400).send({
        status: 'error',
        message: e.message,
      });
    })
  },
  /**
   * Function update().
   *
   * Update task
   *
   */
  update(req, res) {
    const id = req.params.id;
    const values = req.body;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send({
        status: 'error',
        message: 'Failed update task, not found!',
      });
    }

    Task.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: values }, { new: true }).then((result) => {
      if (!result) {
        return res.status(404).send({
          status: 'error',
          message: 'Failed update task, not found!',
        });
      }
      res.status(200).send({
        status: 'oke',
        task: result,
        message: 'Success update task!'
      });
    }).catch((e) => {
      res.status(400).send({
        status: 'error',
        message: e.message,
      });
    });
  },
  /**
   * Function destroy().
   *
   * Remove task
   *
   */
  destroy(req, res) {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send({
        status: 'error',
        message: 'Failed delete task, not found!',
      });
    }

    Task.findOneAndRemove({
      _id: id,
      _creator: req.user._id,
    }).then((result) => {
      if (!result) {
        return res.status(404).send({
          status: 'error',
          message: 'Failed delete task, not found!',
        });
      }
      res.status(200).send({
        status: 'oke',
        task: result,
        message: 'Success delete task!'
      });
    }).catch((e) => {
      res.status(400).send({
        status: 'error',
        message: e.message,
      });
    }); 
  }
}