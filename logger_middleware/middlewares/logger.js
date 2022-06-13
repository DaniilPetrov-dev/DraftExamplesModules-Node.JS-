/**
 * Logs given arguments to the standard output
 * 
 * @returns {undefined}
 */
function log() {
  return console.log(new Date(), ...arguments)
}

module.exports = async function logger(ctx, next) {
  const start = Date.now();
  log({
    // Функция log() выводит логи в стандартный поток вывода,
    // записывает http-метод и url-адрес входящего запроса.
    // Блок try {...} finally {...} передает управление следующему middleware,
    // чтобы вывести логи даже в случае ошибки.
  })
  try {
    await next();
  } finally {
    const duration = Date.now() - start;
    log({ method: ctx.method, url: ctx.url, duration })
  }
}