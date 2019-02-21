const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodosApp", (err, client) => {
    if (err){
        return console.log("Unable to connect MongoDB server");
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodosApp");

    db.collection("todo").findOneAndDelete({
        _id:new ObjectID("5c6e516fde696f2e243b7c68")
    }).then(result => {
        console.log(JSON.stringify(result, undefined, 2));
    });
});