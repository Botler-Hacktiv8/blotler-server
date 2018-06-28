const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: function(v) {
        return /\d/.test(v) && /[a-zA-Z]/.test(v)
      },
      message: 'Password sould be combination of number and letter',
    }
  },
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = 'auth';
  const payload = {
    _id: user._id.toHexString(),
    username: user.username,
    email: user.email,
    access
  }
  const token = jwt.sign(payload, "IAMSUPERPOWERS").toString();
  user.tokens.push({ access, token });
  return user.save().then(() => {
    return token;
  });
}

UserSchema.statics.findByToken = function(token) {
  let user = this;
  let decode;

  try {
    decode = jwt.verify(token, "IAMSUPERPOWERS");
  } catch(e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decode._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  }).select('_id username email tokens');
}

UserSchema.statics.findByCredentials = function(email, password) {
  let user = this;
  return user.findOne({ email })
  // .select('_id username email tokens')
  .then((user) => {
    if (!user) return Promise.reject();
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) resolve(user);
        else reject();
      })
    })
  })
}

UserSchema.methods.removeToken = function(token) {
  let user = this;
  return user.update({
    $pull: {
      tokens: { token }
    }
  })
}

/** hooks */
UserSchema.pre('save', function(next) {
  let user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };