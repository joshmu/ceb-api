const express = require('express')
const db = require('./db/db.js')

// Middleware
const morgan = require('morgan')
const helmet = require('helmet')

// Init
const app = express()
const port = process.env.PORT || 3003

// Middleware init
app.use(morgan('tiny'))
app.use(helmet())

// Static files
app.use(express.static(__dirname + '/static/'))

app.get('/', (req, res, next) => {
  console.log('CEB: home page...')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
