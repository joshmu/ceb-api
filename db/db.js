require('dotenv').config()
const mongoose = require('mongoose')
const fs = require('fs')

const log = msg => console.log(`DB: ${msg}`)

const Log = require('./models/logSchema.js')
module.exports.Log = Log

module.exports.connect = async () => {
  log(`attempting to connect to db...`)
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    log(`connected!`)
  } catch (e) {
    console.error('Failed connecting to DB.', e.message)
    process.exit(1)
  }
}

module.exports.getTrimmedLogs = async () => {
  console.log('db.getTrimmedLogs')
  return Log.find(
    { balances: { $exists: true } },
    {
      'btcusd.signals.daily': 1,
      'ethbtc.signals.daily': 1,
      'ethusd.signals.daily': 1,
      'btcusd.ticker.mid': 1,
      'ethbtc.ticker.mid': 1,
      'ethusd.ticker.mid': 1,
      appTimestamp: 1,
      balances: 1,
      order: 1,
    }
  )
    .sort({ appTimestamp: 'asc' })
    .lean()
}
