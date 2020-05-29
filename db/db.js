require('dotenv').config()
const mongoose = require('mongoose')

const chalk = require('chalk')
const log = (msg) => {
  console.log(chalk.magenta(`DB: ${msg}`))
}

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

module.exports.getLogs = async () => {
  await this.connect()
  return await Log.find({})
}
