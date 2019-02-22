const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");
const _ = require("lodash");

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

app.get('/todos', (req, res) => {
    Todo.find().then(result => {
        res.send({result});
    },(error) => {
        res.status(400).send(error);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id

    if (!ObjectID.isValid(id)){
        res.status(404).send();
    }

    Todo.findById(id).then(result => {
        if (!result){
            res.status(404).send();
        }
        res.send({result});
    }).catch(err => {
        res.status(400).send(err);
    });
});

app.delete("/todos/:id", (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)){
        res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then(result => {
        if(!result){
            res.status(404).send();
        }
        res.send({result});
    }).catch(err => {
        res.status(400).send(err);
    });
});

app.patch("/todos/:id", (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ["text", "completed"]);

    if (!ObjectID.isValid(id)){
        res.status(404).send();
    }
    if(_.isBoolean(body.completed)&&body.completed){
        body.completedAt=new Date().getTime();
    }else{
        body.completed=false;
        body.completedAt=null;
    }
    Todo.findByIdAndUpdate(id, {$set:body}, {new:true}).then(result => {
        if (!result){
            res.status(404).send();
        }
        res.send({result});
    }).catch(err => {
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log("starting on port 3000");
});