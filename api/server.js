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

server.post('/api/accounts', (req, res) => {
    const accountData = req.body;
    db('accounts')
    .insert(accountData)
    .then(ids => {
        const id = ids[0];
        db('accounts')
        .where({ id })
        .first()
        .then(account => {
            res.status(200).json({
                data: account
            });
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    });
});

server.patch('/api/accounts/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    db('accounts')
    .where({ id })
    .update(changes)
    .then(count => {
        if(count > 0) {
            res.status(200).json({
                message: 'Update Successful'
            });
        } else {
            res.status(404).json({
                message: 'No accounts found by that id'
            });
        };
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    });
});

server.delete('/api/accounts/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        if(count) {
            res.status(200).json({
                message: 'Successfully Nuked This Account'
            });
        } else {
            res.status(404).json({
                message: 'Could not find an account with this id to delete'
            });
        };
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error deleting the account'
        });
    });
});

module.exports = server;
