const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { secret } = require('../config/environment')

function secureRoute(req, res, next) {
  if(!req.headers.authorization || !req.headers.authorization.match(/Bearer .+/)) {
    return res.status(401).json({ message: 'Invalid Authorization header' })
  }

  const token = req.headers.authorization.replace('Bearer ', '')

  jwt.verify(token, secret, (err, payload) => {
    if(err) return res.status(401).json({ message: 'Invalid token' })

    User.findById(payload.sub)
      .then(user => {
        if(!user) return res.status(401).json({ message: 'This user no longer exists' })
        req.currentUser = user
        next()
      })
      .catch(() => res.status(401).json({ message: 'Invalid token'}))
  })
}
module.exports = secureRoute
