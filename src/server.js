const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = 3000;

let books = [
  {
    id: 1,
    title: 'Book 1',
    author: 'Author 1',
    isPublished: true,
    year: 2021,
  },
  {
    id: 2,
    title: 'Book 2',
    author: 'Author 2',
    isPublished: false,
    year: 2022,
  },
  {
    id: 3,
    title: 'Book 3',
    author: 'Author 3',
    isPublished: true,
    year: 2023,
  },
  {
    id: 4,
    title: 'Book 4',
    author: 'Author 4',
    isPublished: false,
    year: 2024,
  },
  {
    id: 5,
    title: 'Book 5',
    author: 'Author 5',
    isPublished: true,
    year: 2025,
  },
];

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// GET - /api/books- grazinti visas knygas
app.get('/api/books', (request, response) => {
  response.json(books);
});
// GET - /api/books/1- grazins konkrecia knyga
// kas atsiunciama is vartotojo yra request, su kuo atsakom yra response
app.get('/api/books/:bookId', (request, response) => {
  const bookId = +request.params.bookId;
  const found = books.find((bookObj) => bookObj.id === bookId);
  if (found === undefined) {
    response.status(404).json({ msg: `book with id ${bookId} was not found` });
    return;
  }
  response.json(found);
});

// DELETE -/api/books/1
app.delete('/api/books/:bookId', (req, res) => {
  const bookId = +req.params.bookId;
  // grazinti viska iskyrus ta el kurio id yra =bookId
  books = books.filter((bookObj) => bookObj.id !== bookId);
  res.json(books);
});

app.post('/api/books/', (req, res) => {
  const newBook = {
    id: +Math.random().toString().slice(3),
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    isPublished: req.body.isPublished,
  };
  console.log(newBook);
  books.push(newBook);
  res.sendStatus(201);
});

// PUT /api/books/2 - updates books with id 2 object
app.put('/api/books/:bookId', (req, res) => {
  const bookId = +req.params.bookId;
  const foundIdx = books.findIndex((uObj) => uObj.id === bookId);
  books[foundIdx] = {
    id: bookId,
    ...req.body,
  };
  res.json(books);
});

// catch all route 404 case
app.all('*', (req, res) => {
  res.status(500).json({
    msg: 'something went wrong',
    method: req.method,
    url: req.url,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
