const http = require('http');

http.createServer((req, res) => {
    res.write('hello world');
}).listen(3000);



const api = {
    host: 'https://reqres.in/api/users?page=2',
    method: 'GET'
}

const req = http.request(api, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(JSON.parse(data));
    }).on('error', (err) => {
        console.log(err);
    }).end();
});