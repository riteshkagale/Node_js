var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/TodosApp");

var Todo = mongoose.model("Todo", {
    text:{
        type:String
    },
    complted:{
        type:Boolean
    },
    compltedAt:{
        type:Number
    }
});

var newTodo = new Todo({
    text: "cook dinner"
});

newTodo.save().then(result => {
    console.log("Saved todo",result);
}, (error) => {
    console.log("Unable to save todo");
});