require('dotenv').config()

module.exports = {
  bot: {
    token: process.env.BOT_TOKEN
  },
  proxy: {
    host: process.env.PROXY_HOST,
    port: process.env.PROXY_PORT,
    login: process.env.PROXY_LOGIN,
    password: process.env.PROXY_PASSWORD
  },
  mongoUrl: process.env.MONGO_URL,
  chat: {
    hot: {
      id: -1001196708566
    },
  },
  options: {
    chats: [
      { name: 'Таверна Алхимиков', chatId: -1001372104062 },
      { name: '🎖Test Squad', chatId: -1001405113945, },
    ],
    drink: {
      interval: 900000,
      expiry: 3600000
    }
  }
}
