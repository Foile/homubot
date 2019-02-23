const Composer = require('telegraf/composer')

const composer = new Composer()

composer.hears([/^ты меня уважаешь\?/i, /^\/respect/], ({ i18n, state, replyWithHTML}) => {
  let index = respectIndex(state.user.respect)
  let status = i18n.t(`respect.r${index}`)
  replyWithHTML(status)
})

module.exports = bot => {
  bot.use(composer.middleware())
}

const respectIndex = (value) => {
  let i = respectGradient.length
  while (i--) {
    if (respectGradient[i] <= value) return i + 1
  }
  return respectGradient.length
}

// y = (x^3 + 10x) / 1.1, x = -10..10
//  1000 ┤                   ╭
//   800 ┤                  ╭╯
//   600 ┤                 ╭╯
//   400 ┤                ╭╯
//   200 ┤              ╭─╯
//     0 ┼     ╭────────╯
//  -200 ┤   ╭─╯
//  -400 ┤  ╭╯
//  -600 ┤ ╭╯
//  -800 ┤╭╯
// -1000 ┼╯
//
// [ -1000, -745, -538, -375, -251, -159, -95, -52, -25, -10, 0,
//   10, 25, 52, 95, 159, 251, 375, 538, 745, 1000 ]
const respectGradient = Array(21).fill().map((el, i) => {
  i -= 10
  return Math.round((Math.pow(i, 3) + i * 10) / 1.1)
})
