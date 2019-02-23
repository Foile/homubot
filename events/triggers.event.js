const Composer = require('telegraf/composer')

const composer = new Composer()

composer.hears(/^🍺Взять кружку эля$/, ({ i18n, replyWithHTML}) => {
  let text = '🍺Взять кружку эля'

  replyWithHTML(text)
})

composer.hears(/^\/ave_tykva$/, ({ i18n, replyWithHTML}) => {
  let text = 'Какое-то древнее таинство'

  replyWithHTML(text)
})

module.exports = bot => {
  bot.use(composer.middleware())
}
