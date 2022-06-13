module.exports = async function errorHandler(ctx, next) {
  try {
    await next();
  } catch(err) {
    // Ошибка логируется в стандартный поток вывода.
    console.error(err)
    ctx.status = err.status

    // Возврат ответа в соответствии с ошибкой.
    if (err.status >= 500) {
      ctx.body = 'Наши специалисты уже работают над устранением ошибки'
      return
    }

    if (err.status >= 400) {
      ctx.body = 'Ошибка формирования запроса'
      return
    }
   
  }
}