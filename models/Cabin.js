const mongoose = require('mongoose')

// makes sure user doesn't enter the same thing twice
const uniqueValidator = require('mongoose-unique-validator')

//COMMENT SCHEMA

const cabinSchema = new mongoose.Schema({
  title: {type: String, required: true},
  image: { type: String, required: true},
  sleeps: { type: Number, required: true},
  address: {type: String, required: true}, // REVISIT POTENTIALLY FOR POSTCODE
  description: {type: String, required: true},
  email: {type: String, required: true, unique: true}
  // CREATED BY TO BE ADDED LATER
  // IMPORT COMMENTS SCHEMA
})

cabinSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Cabin', cabinSchema)