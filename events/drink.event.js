const Composer = require('telegraf/composer')
const { Users, Drinks } = require('../database')
const { randi, randex } = require('../helpers/rand.helper')
const request = require('request')
const cheerio = require('cheerio')

const composer = new Composer()

composer.hears(/^\/drink/, async ({ i18n, state, replyWithHTML}) => {
  let telegramId = state.user.telegramId,
      text = '',
      respect,
      index = randi(3)

  let drink = await Drinks.findOneAndDelete({ telegramId })
  if (drink) {
    text = i18n.t(`drink.respect${index}`)
    let rave = await getRave()
    console.log(rave)
    if (rave) text += `\n\n${rave.title}\n<i>${rave.text}</i>`
    respect = 10
  } else {
    text = i18n.t(`drink.fail${index}`)
    respect = -2
  }
  Users.findOneAndUpdate({ telegramId }, { $inc: { respect } })

  replyWithHTML(text)
})

const getRave = async () => {
  let res = await get('https://yandex.ru/referats/?t=philosophy+chemistry')
  let $ = cheerio.load(res)
  let title = $('.referats__text strong').text()
    .replace('Тема: ', '').slice(1).slice(0, -1)
  let p = $('.referats__text p').first().text()
  let colonStartAt = title.indexOf(':')
  if (~colonStartAt) title = title.substring(0, colonStartAt) + '?'

  let sentences = p.split('. ')
  let text = `${sentences[0]}.`
  if ((text.length < 120) && (sentences.length > 1)) text += ` ${sentences[1]}.`

  return { title, text }
}

const get = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, data) => {
      if(error) reject(error)
      else resolve(data)
    })
  })
}

module.exports = bot => {
  bot.use(composer.middleware())
}
