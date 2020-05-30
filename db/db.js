require('dotenv').config()
const mongoose = require('mongoose')

const log = (msg) => console.log(`DB: ${msg}`)

module.exports.Log = Log = require('./models/logSchema.js')

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
  await this.connect()
  return Log.find(
    {},
    {
      'btcusd.signals.daily': 1,
      'ethbtc.signals.daily': 1,
      'ethusd.signals.daily': 1,
      appTimestamp: 1,
      balances: 1,
      order: 1,
    }
  )
}
