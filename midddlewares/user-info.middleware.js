const { Users } = require('../database')
const moment = require('moment')

module.exports = async ({ from, state, message }, next) => {
  let telegramId = from.id
  let user = await Users.findOne({ telegramId })

  if (!user) {
    let data = {
      telegramId: telegramId,
      username: from.username,
      firstName: from.first_name,
      lastName: from.last_name,
      isBot: from.is_bot
    }
    user = await new Users(data).save()
  }

  let diff = moment().diff(moment(user.updatedAt), 'days')
  if (diff >= 1) {
    let data = {
      telegramId: telegramId,
      username: from.username,
      firstName: from.first_name,
      lastName: from.last_name,
      isBot: from.is_bot
    }
    user = await Users.findOneAndUpdate({ telegramId }, { $set: data }, { new: true })
  }

  state.user = user

  next()
}
