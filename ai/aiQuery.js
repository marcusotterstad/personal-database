const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const aiQuery = async function (inputPrompt) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `
        You convert natural language statements into SELECT queries in this database:
        \n
        TABLE workouts (
            workout_id INTEGER PRIMARY KEY AUTOINCREMENT,
            date DATETIME,
            workout_name VARCHAR(255),
            set_id INTEGER REFERENCES sets(set_id),
            duration VARCHAR(255)
        );
        \n
        TABLE exercises (
            exercise_id INTEGER PRIMARY KEY AUTOINCREMENT,
            exercise_name VARCHAR(255) UNIQUE
          );
        \n
        TABLE sets (
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
        Respond in raw sql statement only, no additional text or characters.
        \n
        Example: 
        \n user: find all the sets of a workout with id 3 
        \n response: SELECT * FROM sets WHERE workout_id = 3;
        \n user: find all sets where i did squats
        \n response:  SELECT * FROM sets s INNER JOIN exercises e ON s.exercise_id = e.exercise_id WHERE e.exercise_name = 'squats';
        \n user: ${inputPrompt} 
        \n response:`,
        temperature: 0,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["user:", "response:"],
    });
    console.log(response.data.choices[0].text.replace(/"/g, ''));
    return response.data.choices[0].text.replace(/"/g, '');
}
module.exports = { aiQuery };
