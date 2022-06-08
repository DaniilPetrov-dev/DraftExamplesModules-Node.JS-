const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(async(req, res) => {
  const url = new URL(req.url, `http://localhost`);
  console.log(url);
  const urlPass = url.pathname;

  if (!urlPass) {
    res.statusCode = 400;
  }

  const filePath = path.join(__dirname, 'public', urlPass);
  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    const fileInfo = await fs.promises.stat(filePath);
    const isFile = fileInfo.isFile();
    if (!isFile) {
      throw new Error(`${filePath} is not a file`);
    }

    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    fs
      .createReadStream(filePath)
      .on('error', err => {
        res.emit('error', err)
      })
      .pipe(res);
  } catch (err) {
    res.statusCode = 404;
    res.end('Not found');
  }
});

module.exports = { server }
