const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('mydatabase.sqlite');

db.serialize(() => {
  db.all('SELECT * FROM workouts', (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(rows);
  });
});

db.close();
