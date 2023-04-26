const sqlite3 = require('sqlite3').verbose();

// create a new database file
const db = new sqlite3.Database('mydatabase.sqlite');

// create the tables
db.serialize(() => {
  db.run(`
    CREATE TABLE workouts (
      workout_id INTEGER PRIMARY KEY AUTOINCREMENT,
      date DATETIME,
      workout_name VARCHAR(255),
      set_id INTEGER REFERENCES sets(set_id),
      duration VARCHAR(255)
    );
  `, function (err) {
    if (err) {
      console.log("Error creating workout table:", err);
    }
  })

db.run(`
    CREATE TABLE exercises (
      exercise_id INTEGER PRIMARY KEY AUTOINCREMENT,
      exercise_name VARCHAR(255) UNIQUE
    );
  `, function (err) {
  if (err) {
    console.log("Error creating workout table:", err);
  }
})


db.run(`  
    CREATE TABLE sets (
      set_id INTEGER PRIMARY KEY AUTOINCREMENT,
      exercise_id INTEGER REFERENCES exercises(exercise_id),
      set_order INTEGER,
      weight FLOAT,
      reps INTEGER,
      distance FLOAT,
      seconds INTEGER,
      notes VARCHAR(255),
      workout_notes VARCHAR(255),
      rpe INTEGER
    );
  `, function (err) {
  if (err) {
    console.log("Error creating workout table:", err);
  }
})
});

db.close();
