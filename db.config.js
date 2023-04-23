const sqlite3 = require('sqlite3').verbose();

// create a new database file
const db = new sqlite3.Database('mydatabase.sqlite');

// create the tables
db.serialize(() => {
  db.run(`
    CREATE TABLE workouts (
      id INTEGER PRIMARY KEY,
      date TEXT NOT NULL,
      name TEXT NOT NULL,
      duration INTEGER NOT NULL
    )
  `);
  
  db.run(`
    CREATE TABLE workout_contents (
      id INTEGER PRIMARY KEY,
      workout_id INTEGER NOT NULL,
      exercise_id INTEGER NOT NULL,
      sets INTEGER NOT NULL,
      reps INTEGER NOT NULL,
      weight INTEGER NOT NULL,
      FOREIGN KEY (workout_id) REFERENCES workouts(id),
      FOREIGN KEY (exercise_id) REFERENCES exercises(id)
    )
  `);

  db.run(`
    CREATE TABLE exercises (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE daily_tasks (
      id INTEGER PRIMARY KEY,
      date TEXT NOT NULL,
      habit TEXT NOT NULL,
      completed BOOLEAN NOT NULL,
      notes TEXT,
      workout_id INTEGER,
      FOREIGN KEY (workout_id) REFERENCES workouts(id)
    )
  `);
  db.run(`CREATE TABLE tasks (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
  );
  ALTER TABLE daily_habits
  ADD COLUMN task_id INTEGER REFERENCES tasks(id);
  `)

});

// insert some sample data
db.serialize(() => {
  const workoutStmt = db.prepare(`
    INSERT INTO workouts (date, name, duration)
    VALUES (?, ?, ?)
  `);
  

  const exerciseStmt = db.prepare(`
    INSERT INTO exercises (name)
    VALUES (?)
  `);
  
  exerciseStmt.run('Bench Press');
  exerciseStmt.run('Squats');
  exerciseStmt.run('Deadlifts');

  const habitStmt = db.prepare(`
    INSERT INTO daily_habits (date, habit, completed, notes, workout_id)
    VALUES (?, ?, ?, ?, ?)
  `);

  habitStmt.run('2022-01-01', 'Read for 30 minutes', true, 'Finished "The Great Gatsby"', null);
  habitStmt.run('2022-01-02', 'Drink 8 glasses of water', false, null, null);
  habitStmt.run('2022-01-03', 'Complete 10,000 steps', true, null, 3);
});

// close the database connection
db.close();

