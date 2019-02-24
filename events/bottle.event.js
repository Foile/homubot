const Composer = require('telegraf/composer')
const delay = require('delay')
const { Users } = require('../database')
const { randi, randex } = require('../helpers/rand.helper')

const composer = new Composer()

composer.hears(/^\/bottle/, async ({ i18n, state, replyWithHTML, telegram}) => {
  let text, index, chatId, messageId, target
  let username = state.user.username

  let users = await Users.find({ isBot: false })
  if (!users) return
  target = users[randex(users.length)].username

  text = i18n.t('bottle.spin.start', { name: username })
  let res = await replyWithHTML(text)
  chatId = res.chat.id
  messageId = res.message_id

  await delay(3000)

  text += '\n' + i18n.t('bottle.spin.wait')
  telegram.editMessageText(chatId, messageId, null, text)

  await delay(3000)

  text += ` @${target}`
  telegram.editMessageText(chatId, messageId, null, text)

  await delay(3000)

  index = randi(163)
  text += '\n' + i18n.t('bottle.spin.stop', { name: `@${username}` }) +
          ' ' + i18n.t(`bottle.action${index}`, { target: `@${target}` })
  telegram.editMessageText(chatId, messageId, null, text)
  // text = i18n.t('bottle.spin.start')
  // replyWithHTML(text)

  // let index = randi(107)
  // text = i18n.t(`bottle.action${index}`)
})

// const doAfter = (cb, delay) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       cb()
//     }, delay);
//   })
// }

module.exports = bot => {
  bot.use(composer.middleware())
}
