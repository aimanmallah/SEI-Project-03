const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./config/routes')
const errorHandler = require('./lib/errorHandler')

const app = express()
mongoose.connect('mongodb://localhost:27017/cabins-db')

app.use(bodyParser.json())
app.use('/api', routes)
app.use(errorHandler)

app.listen(4000, () => console.log('Cabins are loaded on port 4000'))