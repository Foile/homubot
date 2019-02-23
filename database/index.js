const config = require('../config')
const mongoose = require('mongoose')
const { randi, randex } = require('../helpers/rand.helper')

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
  .then(console.log('MongoDB connected'))
  .catch(err => console.log(err))

const generateRespect = () => randex(200) - 100

const UsersSchema = new mongoose.Schema({
  telegramId: {
    type: Number,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: false
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  isBot: {
    type: Boolean,
    required: true
  },
  respect: {
    type: Number,
    required: true,
    default: generateRespect
  }
}, { timestamps: {} })

const DrinksSchema = new mongoose.Schema({
  telegramId: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  nick: {
    type: String,
    required: true
  },
  chatId: {
    type: Number,
    required: true
  },
  messageId: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    index: { expires: '1h' }
  }
})


module.exports = {
  Users: mongoose.model('users', UsersSchema),
  Drinks: mongoose.model('drinks', DrinksSchema),
}
