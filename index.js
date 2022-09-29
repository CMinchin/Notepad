const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.get("/api/notes", (req, res) => {
    let file = fs.readFileSync("./db/db.json");
    let notes = JSON.parse(file);
    
    res.json(notes);
});

app.post("/api/notes", (req, res) => {
    let note;
    try {
        note = req.body
    } catch (error) {
        res.status(400).send("Cannot convert to JSON: " + error);
        return;
    }
    
    
    let file = fs.readFileSync("./db/db.json");
    let notes = JSON.parse(file);
    
    notes.push(note);
    
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    
    res.json(note);
});

// Wildcard route to direct users to the home page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);
