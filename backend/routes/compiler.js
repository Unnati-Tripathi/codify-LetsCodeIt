const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/run", async (req, res) => {
  const { code, language_id, userInput } = req.body;

  
  const options = {
  method: 'POST',
  url: 'https://judge029.p.rapidapi.com/submissions', // Use the CodeArena URL
  params: { base64_encoded: 'true', fields: '*' },
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, 
    'X-RapidAPI-Host': 'judge029.p.rapidapi.com' 
  },
  data: {
    source_code: code,
    language_id: language_id,
    stdin: userInput
  }
};

  try {
    const response = await axios.request(options);
    res.json({ success: true, token: response.data.token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Compiler Error", error: error.message });
  }
});

router.get("/status/:token", async (req, res) => {
  const options = {
    method: 'GET',
    url: `https://judge0-ce.p.rapidapi.com/submissions/${req.params.token}`,
    params: { base64_encoded: 'true', fields: '*' },
    headers: {
      'X-RapidAPI-Key': process.env.JUDGE0_KEY,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Status Check Failed" });
  }
});

module.exports = router;