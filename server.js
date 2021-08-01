const express = require("express");

const server = express();

server.listen(3001, () => {
  console.log("Server running on port 3001");
});

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

let books = [
  {
    id: "1",
    title: "Harry Potter",
    author: "J. K. Rowling",
    isAvailable: true,
    burrowedMemberId: "",
    burrowedDate: "",
  },
  {
    id: "2",
    title: "Charlie and the Chocolate Factory",
    author: "Roald Dahl",
    isAvailable: true,
    burrowedMemberId: "",
    burrowedDate: "",
  },
];

server.get("/book", (req, res) => {
  res.send(books);
});

server.get("/book/:id", (req, res) => {
  const id = req.params.id;
  const book = books.find((book) => book.id === id);
  res.send(book);
});

server.post("/book", (req, res) => {
  const { title, author } = req.body;

  const book = {
    id: Math.random().toString(16).slice(2),
    title,
    author,
    isAvailable: true,
    burrowedMemberId: "",
    burrowedDate: "",
  };
  books.push(book);
  res.send(book);
});

server.put("/book/:id/burrow", (req, res) => {
  const id = req.params.id;
  const { burrowedMemberId, burrowedDate } = req.body;

  const bookIndex = books.findIndex((book) => book.id === id);
  books[bookIndex] = {
    ...books[bookIndex],
    isAvailable: false,
    burrowedMemberId,
    burrowedDate,
  };

  res.send(books[bookIndex]);
});

server.put("/book/:id/return", (req, res) => {
  const id = req.params.id;

  const bookIndex = books.findIndex((book) => book.id === id);
  books[bookIndex] = {
    ...books[bookIndex],
    isAvailable: true,
    burrowedMemberId: "",
    burrowedDate: "",
  };

  res.send(books[bookIndex]);
});

server.put("/book/:id", (req, res) => {
  const id = req.params.id;
  const { title, author } = req.body;

  const bookIndex = books.findIndex((book) => book.id === id);
  books[bookIndex] = {
    ...books[bookIndex],
    title,
    author,
  };

  res.send(books[bookIndex]);
});

server.delete("/book/:id", (req, res) => {
  const id = req.params.id;

  books = books.filter((book) => book.id !== id);
  res.send(id);
});
