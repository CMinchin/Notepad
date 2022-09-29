const express = require('express');
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

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get("/api/notes", (req, res) => {
    let notes = {};
    //read db

    res.json(notes);
});

app.post("/api/notes", (req, res) => {
    try {
        let note = JSON.parse(req.body);
    } catch (error) {
        res.status(400).send("Cannot convert to JSON: " + error);
        return;
    }

    // add to database

    res.json(note);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
