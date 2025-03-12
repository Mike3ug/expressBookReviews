const express = require('express');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Funzione per verificare se username e password sono validi
const authenticatedUser = (username, password) => {
    return users.some(user => user.username === username && user.password === password);
};

regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username e password sono obbligatori." });
    }

    if (!authenticatedUser(username, password)) {
        return res.status(401).json({ message: "Credenziali non valide." });
    }

    return res.status(200).json({ message: "Login effettuato con successo!" });
});


regd_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username e password sono obbligatori." });
    }

    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: "Utente già registrato!" });
    }

    users.push({ username, password });
    return res.status(201).json({ message: "Registrazione completata con successo!" });
});


regd_users.put("/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { review, username, password } = req.body;

    if (!authenticatedUser(username, password)) {
        return res.status(403).json({ message: "Accesso negato. Credenziali non valide." });
    }

    if (!books[isbn]) {
        return res.status(404).json({ message: "Libro non trovato." });
    }

    books[isbn].reviews[username] = review;

    return res.status(200).json({ message: "Recensione aggiunta/modificata con successo!", reviews: books[isbn].reviews });
});


regd_users.delete("/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { username, password } = req.body;

    if (!authenticatedUser(username, password)) {
        return res.status(403).json({ message: "Accesso negato. Credenziali non valide." });
    }

    if (!books[isbn]) {
        return res.status(404).json({ message: "Libro non trovato." });
    }

    if (!books[isbn].reviews[username]) {
        return res.status(404).json({ message: "Nessuna recensione trovata per questo utente." });
    }

    delete books[isbn].reviews[username];

    return res.status(200).json({ message: "Recensione eliminata con successo!", reviews: books[isbn].reviews });
});

module.exports.authenticated = regd_users;
module.exports.users = users;

