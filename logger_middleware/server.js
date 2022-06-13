const Koa = require('koa')
const logger = require('./middlewares/logger')
// Подключили модуль, содержащий middlewares логирования

const app = new Koa()
app.use(logger)


app.use(async (ctx, next) => {
  ctx.assert(ctx.query.message, 400, 'Передайте строку в параметре message GET-запроса')
  ctx.body = ctx.query.message
})
module.exports = { app }


