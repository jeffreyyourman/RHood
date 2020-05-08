// https://api.robinhood.com/dividends/ (to get list of dividents -> total up and see how many i've gotten so far)
const { username, deviceToken, password, id } = require("../../keys");
const rbapi = require("../../main");
const db = require("../../connection/config/db/database_connection");

const axios = require("axios");
const fs = require("fs");

module.exports.dividendJob = async function () {
  console.log('dividend job');
  db.on("error", function (err) {
    console.log("Database Error:", err);
  });
  db.on("connect", function () {
    console.log("database connected");
  });
  try {
    let robinhood = await rbapi.create({
      username,
      password,
      deviceToken,
    });
    try {
      const newHood = await robinhood.api.authenticate.refreshAccessToken({
        id,
      });
      const authToken = `Bearer ${newHood.accessToken}`;

      // console.log("newHood", newHood.accessToken);
      const myDividends = await axios(
        'https://api.robinhood.com/dividends',
        // "https://api.robinhood.com/positions/?nonzero=true",
        {
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            authorization: authToken,
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-robinhood-api-version": "1.315.0",
          },
          referrer: "https://robinhood.com/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
        }
      );
      console.log('dividend response', myDividends)
      await emptyDBWithStocks().then(console.log('emptied'));
      
      myDividends.data.results.forEach((dividend) => {
        // if (instrument.symbol === "DIS") {
        //   console.log("disney DB.");
        // }
        (async function () {
          await fillDBWithStocks(dividend).then(console.log('last'));
        })();
      });
    } catch (err) {
      console.log("stocks err", err);
    }
  } catch (err) {
    console.log("stocks err", err);
  }
};

function fillDBWithStocks(eachDividend) {
  return new Promise(function (resolve) {
    db.dividends.update(
      { _id: "5d7c83c37c213e60b8fdbacf" },
      { $push: { data: eachDividend } },
      resolve,
      false,
      true
    );
  });
}
function emptyDBWithStocks() {
  return new Promise(function (resolve) {
    db.dividends.update(
      { _id: "5d7c83c37c213e60b8fdbacf" },
      { $set: { data: [] } },
      resolve,
      false,
      true
    );
  });
}
