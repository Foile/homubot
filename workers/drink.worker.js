const { options } = require('../config')
const { Extra } = require('telegraf')
const { Users, Drinks } = require('../database')
const { randi, randex } = require('../helpers/rand.helper')

const tavernChatId = options.chats[0].chatId

const drinkJob = async (bot, i18n) => {
  let users = await Users.find({ isBot: false })
  if (users.length === 0) return

  let { telegramId, username } = users[randex(users.length)]
  let nick = drunkenNick(username)
  let text = i18n.t('ru', `drink.go${randi(4)}`, { nick })

  let res = await bot.telegram.sendMessage(tavernChatId, text, Extra.HTML())
  if (!res) return

  let chatId = res.chat.id
  let messageId = res.message_id

  new Drinks({ telegramId, username, nick, chatId, messageId }).save()
}

module.exports = (bot, i18n) => {
  setInterval(() => drinkJob(bot, i18n), options.drinkInterval)
}

let drunkenVowel = () => 'aeiouy~'[randex(7)].replace('~', '…<i>hic</i>…')

const drunkenNick = str => {
  let i = length = 7, rnd, tmp, src, res

  str = str.replace(/_/g, '').toLowerCase()
  // Фиксирование длины строки рандомной обрезкой
  while (str.length > length) {
    rnd = randex(str.length)
    str = str.slice(0, rnd) + str.slice(rnd + 1)
  }
  // Формирование массива из строки со вставкой
  // рандомных недостающих элементов
  src = Array.from({ length }, (el, i) => str[i] ? str[i] : drunkenVowel())
  res = src.slice()

  // Тасование Фишера — Йетса
  while (i--) {
    rnd = randex(i)
    tmp = res[i]
    res[i] = res[rnd]
    res[rnd] = tmp
  }

  return res.join('')
}
