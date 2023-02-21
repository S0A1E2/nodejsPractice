"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const app = (0, express_1.default)();
const readFile = (0, util_1.promisify)(fs_1.default.readFile);
const writeFile = (0, util_1.promisify)(fs_1.default.writeFile);
app.use(express_1.default.json());
const booksFile = './books.json';
function readBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const fileContents = yield readFile(booksFile, 'utf8');
        return JSON.parse(fileContents);
    });
}
function writeBooks(books) {
    return __awaiter(this, void 0, void 0, function* () {
        yield writeFile(booksFile, JSON.stringify(books, null, 2), 'utf8');
    });
}
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
app.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = req.body;
    if (!book.id || !book.title || !book.author) {
        return res.status(400).send({ error: 'Book must contain id, title and author' }); // return proper error
    }
    let books = yield readBooks();
    books = [...books, book];
    yield writeBooks(books);
    res.status(201).send(book);
}));
app.get('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield readBooks();
    const book = books.find(b => b.id === Number(req.params.id));
    if (!book) {
        res.status(404).send(`Book with id of ${req.params.id} not found`); // return proper error
    }
    res.send(book);
}));
app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield readBooks();
    res.send(books);
}));
app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.query.title;
    if (!title) {
        // return proper error
    }
    const books = yield readBooks();
    const filteredBooks = books.filter(book => book.title == title); // filter the books to find the proper books
    if (!filteredBooks.length) {
        return res.status(404).send({ error: 'No books found.' });
    }
    res.send(filteredBooks);
}));
app.put('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield readBooks();
    const bookIndex = books.findIndex(b => b.id === Number(req.params.id));
    if (bookIndex === -1) {
        res.status(404).send({ error: "Book not found" }); // return proper error
    }
    const book = Object.assign(Object.assign({}, books[bookIndex]), req.body);
    books[bookIndex] = book;
    yield writeBooks(books);
    res.send(book);
}));
app.delete('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield readBooks();
    const bookIndex = books.findIndex(b => b.id === Number(req.params.id));
    if (bookIndex === -1) {
        res.status(404).send({ error: "Book not found" }); // return proper error.
    }
    const book = books.splice(bookIndex, 1)[0]; // delete by bookIndex
    yield writeBooks(books);
    res.send(book);
}));
