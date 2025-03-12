const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
const public_users = express.Router();


public_users.get('/', (req, res) => {
    new Promise((resolve, reject) => {
        resolve(books);
    }).then((bookList) => {
        res.status(200).json({ books: bookList });
    }).catch((error) => {
        res.status(500).json({ message: "Error fetching book list" });
    });
});


public_users.get('/isbn/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const book = books[isbn];
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching book details" });
    }
});


public_users.get('/author/:author', async (req, res) => {
    try {
        const author = req.params.author;
        const filteredBooks = Object.values(books).filter(book => book.author === author);
        if (filteredBooks.length > 0) {
            res.status(200).json(filteredBooks);
        } else {
            res.status(404).json({ message: "No books found by this author" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching books by author" });
    }
});


public_users.get('/title/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const filteredBooks = Object.values(books).filter(book => book.title === title);
        if (filteredBooks.length > 0) {
            res.status(200).json(filteredBooks);
        } else {
            res.status(404).json({ message: "No books found with this title" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching books by title" });
    }
});

// Get book reviews
public_users.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.status(200).json({ reviews: books[isbn].reviews });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;

