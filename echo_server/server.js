const http = require('http')

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost`);
  console.log(url.searchParams);
  res.setHeader('Content-Type', 'text/plain');
  
  if(url.searchParams.get('message')) {
    res.statusCode = 200;
    res.end(url.searchParams.get('message'));
  } else {
    res.statusCode = 400;
    res.end('Передайте строку в параметре message GET-запроса');
  }
});

module.exports = { server }
