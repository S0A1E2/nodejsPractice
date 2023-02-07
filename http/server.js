const http = require('http');

http.createServer((req, res) => {
    res.write('hello world');
}).listen(3000);