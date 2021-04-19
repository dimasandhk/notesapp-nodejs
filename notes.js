const fs = require("fs");
const chalk = require("chalk");
const success = chalk.green.bold;
const error = chalk.red.bold;
const primary = chalk.blueBright.bold;

// Remove
const removeNote = (title) => {
  const notes = loadNotes();

  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notesToKeep.length == notes.length) {
    console.log(error("No Note Found"));
  } else {
    saveNotes(notesToKeep);
    console.log(success(`Note with ${title} title is removed`));
  }
};

// Add
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(success("New Note Added!"));
  } else {
    console.log(error("Note title taken!"));
  }
};

// List
const listNotes = () => {
  const notes = loadNotes();
  notes.forEach((note, i) => {
    if (i % 2 == 0) {
      console.log(primary(`Note ${i + 1}, title: ${note.title}`));
    } else {
      console.log(success(`Note ${i + 1}, title: ${note.title}`));
    }
  });
};

// Read
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title == title);

  if (!note) {
    console.log(error("No Note Found"));
  } else {
    console.log(success(`Title: ${note.title}`));
    console.log(`Body: ${note.body}`);
  }
};

// Called in addNote
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote,
  listNotes,
  readNote,
};
