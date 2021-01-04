const express = require('express')
const db = require('./db/db.js')

const production = process.env.NODE_ENV === 'production'

// Middleware
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

;(async () => {
  // Init
  const app = express()
  const port = process.env.PORT || 3003
  await db.connect()

  // Middleware init
  app.use(morgan('tiny'))
  app.use(helmet())

  const whitelist = [
    'joshmu',
    'crypto',
    'ceb',
    'mu-ceb-client',
    'localhost',
    'null',
  ]
  const corsOptions = {
    origin: function(origin, callback) {
      console.log({ origin })
      // check !origin for local development
      if (!origin || whitelist.some(w => origin.includes(w))) {
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
    db.getTrimmedLogs().then(data => res.json(data))
  })

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
})()
