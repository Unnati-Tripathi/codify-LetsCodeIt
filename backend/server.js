const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.post('/compile', async (req, res) => {
    try {
        const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', req.body, {
            params: { base64_encoded: 'true', fields: '*' },
            headers: {
                'x-rapidapi-key': process.env.JUDGE0_KEY,
                'content-type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});