const {workoutPOST} = require('../ai/workoutPost');
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('mydatabase.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});


router.post('/', async (req, res) => {
  const inputPrompt = req.body.prompt;
  try {
    const response = await workoutPOST(inputPrompt);
    const sqlStatement = response.trim();
    db.run(sqlStatement, function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error executing SQL statement' });
      } else {
        console.log(`Successfully Added workout to database: ${sqlStatement}`);
        res.json({ message: 'SQL statement executed successfully' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/', (req, res) => {
  db.all('SELECT * FROM workouts', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error executing SQL statement' });
    } else {
      console.log('Successfully executed SQL statement');
      res.json(rows);
    }
  });
});



module.exports = router;

