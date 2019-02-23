module.exports = bot => {
  // require('./new-chat-members')(bot)
  require('./test.event')(bot)
  require('./drink.event')(bot)
  require('./top.event')(bot)
  require('./triggers.event')(bot)
  require('./bottle.event')(bot)
}
