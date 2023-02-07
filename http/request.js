const http = require('http');

const api = {
    host: 'https://reqres.in/api/users?page=2',
    path: '/posts',
    method: 'GET'
}

const req = http.request(api, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(JSON.parse(data));
    });
});

req.end;