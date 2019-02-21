const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/TodosApp", (err, client) => {
    if (err){
        return console.log("Unable to connect MongoDB server");
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodosApp");

    db.collection("todo").insertMany([
        {text:"breakfast"},
        {text:"office"},
        {text:"lunch"}
    ], (err, result) =>{
        if (err){
            return console.log("Unable to insert user", err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
    });
    client.close();
});