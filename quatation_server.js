const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/calculate-tax?brand=toyota&model=aqua&grade=X&year=2024&engineType=Patrol%20Hybrid',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});