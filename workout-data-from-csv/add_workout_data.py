import csv
import sqlite3

# connect to the database
conn = sqlite3.connect('../mydatabase.sqlite')

# create a cursor object to execute queries
c = conn.cursor()

# open the CSV file and read its contents
with open('strong.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        # insert the workout into the workouts table
        c.execute("INSERT INTO workouts (date, name, duration) VALUES (?, ?, ?)",
                  (row['Date'], row['Workout Name'], row['Duration']))

        # insert the exercise into the exercises table if it doesn't already exist
        c.execute("SELECT id FROM exercises WHERE name = ?", (row['Exercise Name'],))
        result = c.fetchone()
        if result is None:
            c.execute("INSERT INTO exercises (name) VALUES (?)", (row['Exercise Name'],))
            exercise_id = c.lastrowid
        else:
            exercise_id = result[0]

        # insert the workout content into the workout_contents table
        c.execute("INSERT INTO workout_contents (workout_id, exercise_id, sets, reps, weight) VALUES (?, ?, ?, ?, ?)",
                  (c.lastrowid, exercise_id, row['Set Order'], row['Reps'], row['Weight']))

        # insert the daily habit into the daily_habits table
        c.execute("INSERT INTO daily_habits (date, habit, completed, notes, workout_id) VALUES (?, ?, ?, ?, ?)",
                  (row['Date'], 'Exercise', True, row['Notes'], c.lastrowid))

# commit the changes to the database
conn.commit()

# close the cursor and the connection
c.close()
conn.close()
