import csv
import sqlite3
from datetime import datetime

# Connect to the SQLite database
conn = sqlite3.connect('../mydatabase.sqlite')
c = conn.cursor()

# Open the CSV file and read the data
with open('strong.csv') as f:
    reader = csv.reader(f)
    next(reader) # skip the header row
    for row in reader:
        # Parse the data from the row
        date = datetime.strptime(row[0], '%Y-%m-%d %H:%M:%S')
        workout_name = row[1]
        duration = row[2]
        exercise_name = row[3]
        set_order = int(row[4])
        weight = float(row[5])
        reps = int(row[6])
        distance = float(row[7])
        seconds = int(row[8])
        notes = row[9]
        workout_notes = row[10]
        rpe = float(row[11]) if row[11] else None
        
        # Insert the data into the exercise table (if not already exists)
        c.execute('INSERT OR IGNORE INTO exercises (exercise_name) VALUES (?)', (exercise_name,))
        
        # Get the exercise ID
        c.execute('SELECT exercise_id FROM exercises WHERE exercise_name = ?', (exercise_name,))
        exercise_id = c.fetchone()[0]
        
        # Insert the data into the set table
        c.execute('INSERT INTO sets (exercise_id, set_order, weight, reps, distance, seconds, notes, workout_notes, rpe) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                  (exercise_id, set_order, weight, reps, distance, seconds, notes, workout_notes, rpe))
        set_id = c.lastrowid
        
        # Insert the data into the workout table
        c.execute('INSERT INTO workouts (date, workout_name, set_id, duration) VALUES (?, ?, ?, ?)',
                  (date, workout_name, set_id, duration))

# Commit the changes and close the database connection
conn.commit()
conn.close()
