const axios = require('axios');
const fs = require('fs');
const { jsonrepair } = require('jsonrepair');
const FormData = require('form-data');

const API_URL = 'https://www.aucjp.com/st?file=loader&ajx=17363173799221-form';

async function fetchCarData(modelName) {
let data = new FormData();
data.append('url_loader', 'st?file=loader&Q=${modelName}');
data.append('page', '1');
data.append('sort_ord', '');
data.append('url_luboy', 'Any');
data.append('url_lubaya', 'Any');
data.append('lose_time_here_buT_not_buy_servlce_for_100_usd_monthly_here_http_avto_jp', 'http://avto.jp/specification.html');
data.append('tpl', '');
data.append('edit_post', '');
data.append('is_stat', '0');
data.append('vendor', '');
data.append('model', modelName);
data.append('bid', '');
data.append('kuzov', '');
data.append('rate', '');
data.append('status', '');
data.append('kpp_add', '');
data.append('colour', '');
data.append('auct_name', '');
data.append('_day', '');
data.append('_rate', '');
data.append('_status', '');
data.append('_kpp_add', '');
data.append('_auct_name', '');
data.append('list_size', '');
data.append('_list_size', '');
data.append('lhw', '');
data.append('eqqp', '');
data.append('stDt1', '');
data.append('stDt2', '');
data.append('year', '');
data.append('year2', '');
data.append('probeg', '');
data.append('probeg2', '');
data.append('eng_v', '');
data.append('eng_v2', '');
data.append('price_start', '');
data.append('price_start2', '');
data.append('price_finish', '');
data.append('price_finish2', '');
data.append('_year', '');
data.append('_year2', '');
data.append('_probeg', '');
data.append('_probeg2', '');
data.append('_eng_v', '');
data.append('_eng_v2', '');
data.append('_price_start', '');
data.append('_price_start2', '');
data.append('_price_finish', '');
data.append('_price_finish2', '');

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: API_URL,
  headers: {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'max-age=0',
    'cookie': 'aj_geo=en; aj_geo2=Colombo; aj_geo3=lk; _ga=GA1.1.499670231.1736309973; _ga_MND4RP79WH=GS1.1.1736317199.2.1.1736317367.0.0.0; aj_geo=en; aj_geo3=lk',
    'origin': 'https://www.aucjp.com',
    'priority': 'u=0, i',
    'referer': 'https://www.aucjp.com/japan_st',
    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'iframe',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    ...data.getHeaders()
  },
  data: data,
  responseType: 'text',
  transformResponse: [(data) => data]
};

axios.request(config)
  .then((response) => {
    // Step 2: Split the response text to isolate the desired data
    let dataArr = response.data.split('body:[');
    if (dataArr.length < 2) {
      throw new Error('Unexpected response format: "body:[" not found.');
    }

    // Step 4: Extract the auction data section
    let auctionData = dataArr[1];

    // Step 5: Remove the trailing characters after the closing bracket
    auctionData = auctionData.split(']};')[0];
    auctionData = auctionData.split('] };')[0];

    // Step 6: Remove escape characters
    auctionData = auctionData.replaceAll("\\", "");
    auctionData = auctionData.replace(/,(\s*])/, '');

    //console.log("extracted JSON String Before Repair: ", auctionData);

    const jsonString = JSON.stringify(auctionData, null, 2);



    // // Step 7: Reconstruct the JSON string
    //auctionData = '{body:[' + auctionData + ']}';





    const repairedJson = jsonrepair(auctionData);
    const finalBody = '{"body":' + repairedJson + '}';
    // // Step 9: Parse the JSON string into an object
    let data = JSON.parse(finalBody);

    // // Step 10: Access the car list from the parsed data
    let carList = data.body;

    // Output the car list
    //console.log(repairedJson);
    //console.log(finalBody);
    console.log(`Car List for ${modelName}:`, carList);

   
    fs.writeFileSync(`search_results/${modelName}_cars.json`, JSON.stringify(carList, null, 4), 'utf8');

    console.log(`Data for ${modelName} stored in ${modelName}_cars.json successfully!`);


  })
  .catch((error) => {
    console.error('Error processing the response:', error.message);
  });

 

}

     // Call API for multiple models
     const models = ['AXELA', 'COROLLA', 'CIVIC','AQUA','LEAF'];  // Add more models as needed
     models.forEach(model => fetchCarData(model));