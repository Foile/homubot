const Composer = require('telegraf/composer')
const { Users } = require('../database')

const composer = new Composer()

composer.hears(/^\/top/, async ({ i18n, replyWithHTML}) => {
  let users = await Users.find({ isBot: false })
  if (!users) return

  let text = i18n.t('top.start') + '\n'
  text += users.map((user, i) => {
    let res = i18n.t('top.row', { i: i + 1, fullname: user.username })
    return res
  }).join('\n')

  replyWithHTML(text)
})

module.exports = bot => {
  bot.use(composer.middleware())
}
