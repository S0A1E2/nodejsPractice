import express from 'express';
import fs from 'fs';
import { promisify } from 'util';

const app = express();
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

app.use(express.json());

const booksFile = './books.json';

interface Book {
    id: number;
    title: string;
    author: string;
}

async function readBooks(): Promise<Book[]> {
    const fileContents = await readFile(booksFile, 'utf8');
    return JSON.parse(fileContents);
}

async function writeBooks(books: Book[]): Promise<void> {
    await writeFile(booksFile, JSON.stringify(books, null, 2), 'utf8');
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

app.post('/books', async (req, res) => {
    const book = req.body as Book;
    if (!book.id || !book.title || !book.author) {
        return res.status(400).send({ error: 'Book must contain id, title and author' });// return proper error
    }

    let books = await readBooks();
    books = [...books, book];
    await writeBooks(books);

    res.status(201).send(book);
});

app.get('/books/:id', async (req, res) => {
    const books = await readBooks();
    const book = books.find(b => b.id === Number(req.params.id));
    if (!book) {
        res.status(404).send(`Book with id of ${req.params.id} not found`); // return proper error
    }

    res.send(book);
});

app.get('/books', async (req, res) => {
    const books = await readBooks();
    res.send(books);
});

app.get('/books', async (req, res) => {
    const title = req.query.title;
    if (!title) {
        // return proper error
    }

    const books = await readBooks();
    const filteredBooks = books.filter(book => book.title == title); // filter the books to find the proper books
    if (!filteredBooks.length) {
        return res.status(404).send({ error: 'No books found.' });
    }

    res.send(filteredBooks);
});

app.put('/books/:id', async (req, res) => {
    const books = await readBooks();
    const bookIndex = books.findIndex(b => b.id === Number(req.params.id));
    if (bookIndex === -1) {
        res.status(404).send({error:"Book not found"});// return proper error
    }

    const book = { ...books[bookIndex], ...req.body };
    books[bookIndex] = book;
    await writeBooks(books);

    res.send(book);
});

app.delete('/books/:id', async (req, res) => {
    const books = await readBooks();
    const bookIndex = books.findIndex(b => b.id === Number(req.params.id));
    if (bookIndex === -1) {
        res.status(404).send({error:"Book not found"});// return proper error.
    }

    const book = books.splice(bookIndex, 1)[0]; // delete by bookIndex
    await writeBooks(books);

    res.send(book);
});

