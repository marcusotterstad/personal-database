const {workoutPOST} = require('../ai/workoutPost');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const inputPrompt = req.body.prompt;
  try {
    const response = await workoutPOST(inputPrompt);
    res.json({ response }); // assuming you want to return the SQL statement as a JSON object
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;

