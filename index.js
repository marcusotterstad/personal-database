const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const assistantRouter = require('./routers/assistantRouter')
app.use('/workouts', assistantRouter)

// Open SQLite database
const db = new sqlite3.Database('mydatabase.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
  