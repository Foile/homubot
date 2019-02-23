const path = require('path')
const config = require('./config')
// require('./database')
const SocksAgent = require('socks5-https-client/lib/Agent')
const Telegraf = require('telegraf')
const TelegrafI18n = require('telegraf-i18n')
const userInfo = require('./midddlewares/user-info.middleware')
const events = require('./events')
const workers = require('./workers')

const socksAgent = new SocksAgent({
  socksHost: config.proxy.host,
  socksPort: config.proxy.port,
  socksUsername: config.proxy.login,
  socksPassword: config.proxy.password
})

const bot = new Telegraf(config.bot.token, { telegram: { agent: socksAgent } })
bot.telegram.getMe().then(botInfo => {
  bot.options.username = botInfo.username
  bot.options.id = botInfo.id
})

const i18n = new TelegrafI18n({
  defaultLanguage: 'ru',
  directory: path.resolve(__dirname, 'locales')
})

// Middlewares
bot.use(i18n.middleware())
bot.use(userInfo)

// Events
events(bot)

// Workers
workers(bot, i18n)

bot.launch()
