const http = require('http');
const moment = require('moment');

http.createServer((req, res) => {
    if(req == '/') {
        res.write('hello world');
    }
    if(req == '/moment') {
        console.log(moment.now());
    }
}).listen(8080);