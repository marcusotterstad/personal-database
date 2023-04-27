const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const workoutPOST = async function(inputPrompt) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `You convert natural language statements that contain date, name of workout, duration of workout into sql statements.
            Respond in raw sql statement only, no additional text or characters.
            For date always respond in DD/MM/YYYY format. 
            If the user prompt is today, use CURRENT_DATE as date.
            \n
      Example:\n
        user: "I just finished a workout called Legs and it took me about 75 minutes. Can you add it to the database with the date of 2022-02-20?"\n
        response: "INSERT INTO workouts (date, name, duration) VALUES ('2022-02-20', 'Legs', 75)"
        \n
        user: ${inputPrompt}
        response: `
  ,
    temperature: 0,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["user:", "response:"],
  });
  const formattedResponse = response.data.choices[0].text.replace(/"/g, '')
  return formattedResponse
}

module.exports = {workoutPOST} 