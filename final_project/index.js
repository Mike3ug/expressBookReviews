const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// Configurazione della sessione per il percorso "/customer"
app.use("/customer", session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
}));

// Middleware di autenticazione per le rotte "/customer/auth/*"
// app.use("/customer/auth/*", function auth(req, res, next) {
 //    const token = req.headers.authorization;
// 
//     if (!token) {
//         return res.status(403).json({ message: "Token mancante. Accesso negato." });
//     }
// 
 //    try {
 //        const decoded = jwt.verify(token.split(" ")[1], "secret_key"); // Decodifica il token
 //        req.user = decoded; // Aggiunge i dati dell'utente alla richiesta
 //        next(); // Passa alla prossima funzione
 //    } catch (error) {
 //       return res.status(403).json({ message: "Token non valido." });
 //    }
// });

const PORT = 5000;

// Definizione delle rotte
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
