const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function registerRoute(req, res, next) {
  User.create(req.body)
    .then(() => res.status(201).json({ message: 'Registration succesful' }))
    .catch(next)
}

function loginRoute(req, res, next) {
  User.findOne({ email: req.body.password })
    .then(user => {
      if(!user || !user.isPasswordValid(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorised' })
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
      res.json({ message: 'Welcome back!', token})
    })
    .catch(next)
}

module.exports = {
  register: registerRoute,
  login: loginRoute
}
