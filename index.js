const express = require('express')
const db = require('./db/db.js')

// Middleware
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

// Init
const app = express()
const port = process.env.PORT || 3003

// Middleware init
app.use(morgan('tiny'))
app.use(helmet())

let whitelist = [
  `http://localhost:${port}`,
  'http://127.0.0.1:5500',
  'https://joshmu.com',
  'http://joshmu.com',
  'http://ceb.joshmu.com',
  'http://crypto.joshmu.com',
]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}
app.use(cors(corsOptions))

// Static files
app.use(express.static(__dirname + '/static/'))

app.get('/', (req, res, next) => {
  console.log('CEB: home page...')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
