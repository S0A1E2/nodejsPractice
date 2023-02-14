const fs = require('fs');

function readBooks() {
    return new Promise((resolve, reject) => {
        fs.readFile('./books.json', (error, data) => {
            if(error) return reject(error);

            resolve(JSON.parse(data));
        });
    });
}
module.exports = readBooks;