const fs = require('fs');

function writeBooks(books) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./books.json', JSON.stringify(books), (error) => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
}
module.exports = writeBooks;