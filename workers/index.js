module.exports = (bot, i18n) => {
  // require('./new-chat-members')(bot)
  require('./drink.worker')(bot, i18n)
}
