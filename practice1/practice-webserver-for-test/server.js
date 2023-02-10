const http = require('http');
const moment = require('moment');
const EventEmitter = require('events');


const emitter = new EventEmitter();

const PORT = process.env.PORT || 3000;



const person = {
    name: 'john',
    age: '30',
    job: 'programmer',
}

const server = http.createServer(async (req, res) => {
    if(req.url === '/') {
        res.write(`<h1>WELCOME</h1>`);
    }
    if(req.url === '/api/current-time') {
        res.write(`<h1>${await getCurrentTime()}</h1>`);
    }
    if(req.url === '/api/person') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        setTimeout(() => {
            emitter.emit('personality', person);
        }, 2000);
    }

    emitter.on('personality', (person) => {
        res.end(JSON.stringify({person}));
    });
});

async function getCurrentTime() {
    return moment().format('2012-12-12 12:12:12');
}

server.listen(PORT);
console.log(`conncted on port ${PORT}`);