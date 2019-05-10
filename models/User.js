const mongoose = require('mongoose')
// to encrypt password
const bcrypt = require('bcrypt')

// schema denotes what is required from the user in order to register
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Please provide a username',
    unique: 'That username is already registered'
  },
  email: {
    type: String,
    required: 'Please provide email',
    unique: 'That email is already registered'
  },
  password: {
    type: String,
    required: 'Please provide a password'
  },
  photo: {
    type: String,
    required: 'Please provide a photo of yourself'
  },
  bio: {
    type: String,
    required: 'Please tell us about yourself'
  }
})
// because we don't want password to be stored, so checks its the same without storing
userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(plaintext) {
    this._passwordConfirmation = plaintext
  })
// LIFE CYCLE HOOKS
userSchema.pre('validate', function checkPasswords(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'Passwords do not match')
  }
  next()
})

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
  }
  next()
})

userSchema.methods.isPasswordValid = function isPassword(plaintext) {
  return bcrypt.compareSync(plaintext, this.password)
}

module.exports = mongoose.model('User', userSchema)