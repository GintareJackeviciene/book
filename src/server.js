const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = 3000;

const books = [
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

app.post('/api/books/', (req, res) => {
  const newBook = {
    id: Math.random().toString().slice(3),
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    isPublished: req.body.isPublished,
  };
  console.log(newBook);
  books.push(newBook);
  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
