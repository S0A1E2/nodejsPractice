const express = require('express');
const readBooks = require('./read-books');
const writeBooks = require('./write-books');

const app = express();

app.use(express.json());


app.get('/books', async (request, response) => {
    const books = await readBooks();

    response.send(books);
});

app.get('/books/:id', async (request, response) => {
    const books = await readBooks();
    const book = books.find(book => book.id == request.params.id); // find the book from the array.

    if(!book) {
        return response.status(404).send({error: 'Not Found'});
    }

    response.send(book);
});

app.get('books', async (request, response) => {
    const books = await readBooks();
    const q = request.query.q;

    if(!q) {
        return response.status(400).send({error: 'Query parameter is missing'});  // return proper error;
    }

    const searchResults = books.filter(books => book.title.toLowerCase().includes(q.toLocaleLowerCase)); //filter the books properly.

    response.send(searchResults);
});

app.post('/books', async (request, response) => {
    const {title, auther, publisher, year} = request.body;

    if (!title || !auther || !publisher || !year) {
        response.status(404).send(`Not Found`);
    }

    const books = await readBooks();
    const id = books[books.length - 1].id + 1;
    const newBook = {id, title, publisher, year}; //create a new book.

    books.push(newBook);
    
    try {
        await writeBooks(books);
    } catch(err) {
        return response.status(500).send({err: `Internal Server Error`});
    }
    response.status(201).send(newBook);
});

app.put('/books/:id', async (request, response) => {
    const books = await readBooks();
    const bookIndex = books.findIndex(book => book.id == parseInt(request.params.id)); //find the one you want to update it.

    if (bookIndex === -1) {
        return response.status(404).send({error: 'Book not found'});  // return proper error.
    }

    const {title, auther, publisher, year} = request.body;
    books[bookIndex] = {id: books[bookIndex].id, title, auther, publisher, year};

    try {
        await writeBooks(books);
        response.send(books[bookIndex]);
    } catch(err) {
        return response.status(500).send({error: 'Internal Server Error'});
    }
});

app.delete('/books/:id', async (request, response) => {
    const books = await readBooks();
    const bookIndex = books.findIndex((book) => book.id === parseInt(request.params.id  )); //find the one you want to delete it.

    if(bookIndex === -1) {
        return response.status(404).send({error: 'Book not found'});   // return proper error.
    }

    const deleteBook = books.splice(bookIndex, 1);

    try {
        await writeBooks(books);
    } catch(err) {
        return response.status(500).send({error: 'Internal Server Error'});
    }
    response.send(deleteBook);
});

app.listen(3000, () => {
    console.log(`server started on port 3000`);
});