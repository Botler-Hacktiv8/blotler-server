const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  timeStart: {
    type: Date,
    required: true,
  },
  timeEnd: {
    type: Date,
    required: true,
  },
  locationName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };