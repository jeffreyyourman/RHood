const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const db = require("./connection/config/db/database_connection");
// const {
//   // syncAllData,
//   syncInstruments,
// } = require("./models/jobs/allInstruments.jobs");
// const { dividendJob } = require("./models/jobs/dividends.jobs");
// const { paymentsJob } = require("./models/jobs/payments.jobs");
// const cron = require("node-cron");
const cors = require("cors");

app.use(cors());

app.get("/api/instru", async (req, res) => {
  var getDocument = () => {
    return new Promise((resolve, reject) => {
      db.stocks.find(function (err, data) {
        err ? reject(err) : resolve(data);
      });
    });
  };
  const allInstruments = await getDocument();
  // console.log('allInstruments',allInstruments[0].data.length);
  res.json({ myInstruments: allInstruments[0].data });
});

app.get("/api/payment-history", async (req, res) => {
  var getPaymentHistory = () => {
    return new Promise((resolve, reject) => {
      db.payments.find(function (err, data) {
        err ? reject(err) : resolve(data);
      });
    });
  };
  const allPaymentHistory = await getPaymentHistory();

  const paymentHistory = allPaymentHistory[0].data.filter((payment) => {
    var year = new Date(payment.expected_landing_date).getFullYear();
    return year >= 2020 && payment;
  });
  console.log("paymentHistory", paymentHistory);
  res.json({ response: paymentHistory });
});

app.get("/api/dividend-history", async (req, res) => {
  // console.log('hihihi')
  var getDividendHistory = () => {
    return new Promise((resolve, reject) => {
      db.dividends.find(function (err, data) {
        err ? reject(err) : resolve(data);
      });
    });
  };
  const dividendHistory = await getDividendHistory();
  // console.log('dividendHistory',dividendHistory[0].data.length);
  res.json({ response: dividendHistory[0].data });
});

app.get("/api/stock-dividend/:ticker", async (req, res) => {
  const ticker = req.params.ticker;
  const StockDividendHistoryResponse = await axios.get(
    `https://api.nasdaq.com/api/quote/${ticker}/dividends?assetclass=stocks`
  );
  StockDividendHistoryResponse.data.data.ticker = ticker;
  res.json({ response: StockDividendHistoryResponse.data });
});
app.get("/api/stock-earnings-date/:ticker", async (req, res) => {
  // https://api.nasdaq.com/api/analyst/DIS/earnings-date
  //announcement
  // https://api.nasdaq.com/api/analyst/DIS/earnings-forecast
  // surprise
  // https://api.nasdaq.com/api/company/DIS/earnings-surprise
  // forcast
  const ticker = req.params.ticker;
  console.log("ticker", ticker);
  const earningsResponse = await axios.get(
    `https://api.nasdaq.com/api/analyst/${ticker}/earnings-date`
  );
  earningsResponse.data.data.ticker = ticker;
  res.json({ response: earningsResponse.data });
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
// dividendJob();
// paymentsJob()
// cron.schedule(
//   "0 19 * * * *",
//   async () => {
// syncInstruments();
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
