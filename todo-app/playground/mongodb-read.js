const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/TodosApp", (err, client) => {
    if (err){
        return console.log("Unable to connect MongoDB server");
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodosApp");

    db.collection("todo").find().toArray().then(result => {
        console.log(JSON.stringify(result, undefined, 2));
    });
});