const http = require('http');
const moment = require('moment');

http.createServer((err, req, res) => {
    if(err) {
        console.error(err);
    }
    
    if(req == '/') {
        res.write('hello world');
    }
    if(req == '/moment') {
        console.log(moment.now());
    }
}).listen(8080);