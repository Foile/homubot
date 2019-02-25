const Composer = require('telegraf/composer')
const { Users, Drinks } = require('../database')
const { randi, randex } = require('../helpers/rand.helper')

const composer = new Composer()

composer.hears(/^\/drink/, async ({ i18n, state, replyWithHTML}) => {
  let telegramId = state.user.telegramId,
      text = '',
      respect,
      index = randi(3)

  let drink = await Drinks.findOneAndDelete({ telegramId })
  if (drink) {
    text = i18n.t(`drink.respect${index}`)
    respect = 10
  } else {
    text = i18n.t(`drink.fail${index}`)
    respect = -2
  }
  Users.findOneAndUpdate({ telegramId }, { $inc: { respect } })

  replyWithHTML(text)
})

module.exports = bot => {
  bot.use(composer.middleware())
}
