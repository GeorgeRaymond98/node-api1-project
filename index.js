// implement your API here

const express = require('express');

const sever = express();

sever.use(express.json());

const port = 8000;
server.listen(port, () => console.log(`api running on port ${port}`));

const db = require('./data/db');

server.get('/', (req, res) => { 
    res.send('Workin!');
 });

server.post('/api/users', (req, res) => {

    if (!req.body.name || !req.body.bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
    db.insert(req.body).then(user => {
        res.status(201).json(user);
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the user to the database" });
    });
})

server.get('/api/users', (req, res) => {
    db.find().then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved."});
    });
})

server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id).then(user => {
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved."});
    });
})

server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id).then(user => {
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The user could not be removed" });
    });
})

server.put('/api/users/:id', (req, res) => {
    if (!req.body.name || !req.body.bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
    db.update(req.params.id, req.body).then(user => {
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be modified." });
    });
})

