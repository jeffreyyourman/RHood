const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require('axios');
const db = require("./connection/config/db/database_connection");
const {
  syncAllData,
  syncInstruments,
} = require("./models/jobs/allInstruments.jobs");
const cron = require("node-cron");


app.get("/api/instru", async (req, res) => {
  var getDocument = () => {
    return new Promise((resolve, reject) => {
      db.stocks.find(function (err, data) {
        err ? reject(err) : resolve(data);
      });
    });
  };
  const allInstruments = await getDocument();
  console.log('allInstruments',allInstruments[0].data.length);
  res.json({ allInstruments: allInstruments[0].data });
});

app.get("/api/dividend-history/:ticker", async (req, res) => {
  const ticker = req.params.ticker;
  const dividendResponse = await axios.get(`https://api.nasdaq.com/api/quote/${ticker}/dividends?assetclass=stocks`);
  dividendResponse.data.data.ticker = ticker
  res.json({ response: dividendResponse.data });
});
app.get("/api/earnings-date/:ticker", async (req, res) => {
  // https://api.nasdaq.com/api/analyst/DIS/earnings-date 
    //announcement
  // https://api.nasdaq.com/api/analyst/DIS/earnings-forecast
    // surprise
  // https://api.nasdaq.com/api/company/DIS/earnings-surprise
    // forcast
  const ticker = req.params.ticker;
  console.log('ticker', ticker);
  const dividendResponse = await axios.get(`https://api.nasdaq.com/api/analyst/${ticker}/earnings-date`);
  dividendResponse.data.data.ticker = ticker
  res.json({ response: dividendResponse.data });
});

// cron.schedule(
//   "0 10 * * * *",
//   async () => {
//     syncInstruments();
//   },
//   {
//     scheduled: true,
//     timezone: "America/New_York",
//   }
// );


// cron.schedule(
//   "0 19 * * * *",
//   async () => {
//     syncInstruments();
//   },
//   {
//     scheduled: true,
//     timezone: "America/New_York",
//   }
// );
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
