// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3033 ;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
// app.get("/*", function(req, res) {
//     res.sendFile(path.join(__dirname, "/public/index.html"));
//   });

// Paths to the html files are now working in localhost.

// Paths for reading the db.json file and adding to the left side of the note app
// because I am using readFile method the index.js file needed to be updated to parse the notes being passed from the db.json file.  Jake O'Toole derived this solution
app.get("/api/notes/", function (req, res) {
    fs.readFile("./db/db.json", "utf8", (err, notes) => {
        // console.log("Hello");
        if (err) throw err;
        // console.log(notes);
        return res.json(notes);

    });

});
// Paths need to be written for creating a new note
app.post("/api/notes", function (req, res) {
    let Notes = []
    let id = 1
    console.log(req.body, "This is the most recent Note");
    fs.readFile("./db/db.json", "utf8", function (err, res) {
        if (err) {
            console.log(err);
            throw err;
        }
        Notes = JSON.parse(res);
        // console.log(Notes);

        Notes.push(req.body);
        for (let i = 0; i < Notes.length; i++) {
            Notes[i].id = i + 1
        }
        // console.log(Notes);

        fs.writeFile("db/db.json", JSON.stringify(Notes), err => {
            if (err) throw err;
            console.log(Notes, "HI");
            return Notes;
        }
        );
    });
    res.send(Notes);
});

// Paths need to be written for deleting a note based on noteId







// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});