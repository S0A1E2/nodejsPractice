const https = require('https');

const api = {
    host: 'reqres.in',
    path: '/api/users/2',
    method: 'GET'
}

const req = https.request(api, (res) => {
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