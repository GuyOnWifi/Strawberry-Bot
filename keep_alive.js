var http = require('http');

http.createServer(function (req, res) {
  res.write("Bot alive");
  res.end();
}).listen(8080);
