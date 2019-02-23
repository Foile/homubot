module.exports = bot => {
  // require('./new-chat-members')(bot)
  require('./respect.event')(bot)
  require('./drink.event')(bot)
  require('./top.event')(bot)
  require('./triggers.event')(bot)
  require('./bottle.event')(bot)
}
