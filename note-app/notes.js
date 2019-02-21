const fs = require("fs");

var fetchNotes = () => {
    try{
        var noteString = fs.readFileSync("notes-data.json");
        return JSON.parse(noteString);
    }catch(error){
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes, undefined, 2));
}

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    }

    var duplicateNotes = notes.filter((note) => note.title == title);
    if (duplicateNotes.length == 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

var logNotes = (note) => {
    console.log("---");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter(note => note.title==title);
    return filteredNotes[0];
}

var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter(note => note.title!=title);
    saveNotes(filteredNotes);

    return (notes.length != filteredNotes.length);
}

var getAll = () => {
    return fetchNotes();
}

module.exports = {
    addNote, 
    logNotes,
    getNote,
    removeNote,
    getAll
}