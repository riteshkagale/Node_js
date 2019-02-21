const yargs = require("yargs");
const notes = require("./notes");

var titleOptions = {
    describe : "Title of Note",
    demand : true,
    alias : "t"
}

var bodyOption = {
    describe : "Body of Note",
    demand : true,
    alias : "b"
}

const argv = yargs
            .command("add", "Adding notes", {
                title:titleOptions,
                body:bodyOption
            })
            .command("list", "Listing all the notes")
            .command("read", "Read the note", {
                title:titleOptions
            })
            .command("remove", "Remove the note", {
                title:titleOptions
            })
            .help()
            .argv;

command = argv._[0];
console.log(`Command: ${command}`);

if (command == "add"){
    note = notes.addNote(argv.title, argv.body);
    if (note){
        console.log("Note is created");
        notes.logNotes(note);
    }else{
        console.log("Note Taken.")
    }
}else if (command == "list"){
    var allNotes = notes.getAll();
    console.log(`Printing all ${allNotes.length} notes`);
    allNotes.forEach(note => notes.logNotes(note));
}else if (command == "read"){
    note = notes.getNote(argv.title);
    if (note){
        console.log("Read Note");
        notes.logNotes(note);
    }else{
        console.log("Note not found");
    }
}else if (command == "remove"){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? "Note was removed" : "Note not found";
    console.log(message);
}else{
    console.log("Note not recognized");
}