const express = require("express");
const bodyParser = require("body-parser");

const {mongoose} = require("./db/mongoose");
const {Todo} = require("./models/todo");

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((result) => {
        res.send(result);
    }, (error) => {
        res.status(400).send(error);
    });
});

// app.get('/todos', (req, res) => {
//     Todo.find().then(result => {
//         res.send({result});
//     },(error) => {
//         res.status(400).send(error);
//     });
// });

app.listen(3000, () => {
    console.log("starting on port 3000");
});