const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  ctx.assert(ctx.query.message, 400, 'Передайте строку в параметре message GET-запроса')
  ctx.body = ctx.query.message
})

module.exports = { app }


