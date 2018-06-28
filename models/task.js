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
    default: null,
  },
  timeEnd: {
    type: Date,
    default: null
  },
  locationName: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null
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