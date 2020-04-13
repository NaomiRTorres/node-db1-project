const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    db.select('*')
    .from('accounts')
    .then(accounts => {
        res.status(200).json({
            data: accounts
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    });
});

server.get('/api/accounts/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
        res.status(200).json({
            data: account
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    });
});

module.exports = server;
