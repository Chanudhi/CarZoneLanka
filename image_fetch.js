const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); // Allow cross-origin requests
const app = express();
const PORT = 2000;
app.use(cors()); 

const urlParams = new URLSearchParams(window.location.search);

app.get('/get-images', async (req, res) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://www.aucjp.com/st-${urlParams.get("")}.htm`,
    headers: {
      'accept-language': 'en-US,en;q=0.9',
      'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36',
    }
  };

  try {
    const response = await axios.request(config);
    const $ = cheerio.load(response.data);
    const imageUrls = [];

    $('img').each((index, element) => {
      const imgSrc = $(element).attr('src');
      if (imgSrc && imgSrc.startsWith('https://8.ajes.com/imgs/')) {
        imageUrls.push(imgSrc);
      }
    });

    res.json(imageUrls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use(express.static('insidecar')); // Serve static HTML

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
