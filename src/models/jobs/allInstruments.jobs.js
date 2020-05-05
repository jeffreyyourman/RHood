const { username, deviceToken, password, id } = require("../../keys");
const rbapi = require("../../main");
const db = require("../../connection/config/db/database_connection");

const axios = require("axios");
const fs = require("fs");
let saveAllInstruments = [];
let counter = 0;

module.exports.syncAllData = async function () {
  (async function () {
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

        const firstResponse = await axios(
          "https://api.robinhood.com/instruments/?ids=",
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
        // console.log('nextResponse',nextResponse);
        if (firstResponse.next !== "") {
          for (let i = 0; i < firstResponse.data.results.length; i++) {
            const element = firstResponse.data.results[i];
            // console.log('element,', element);
            delete element.market;
            delete element.simple_name;
            delete element.state;
            delete element.quote;
            delete element.splits;
            delete element.bloomberg_unique;
            delete element.margin_initial_ratio;
            delete element.maintenance_ratio;
            delete element.country;
            delete element.day_trade_ratio;
            delete element.list_date;
            delete element.min_tick_size;
            delete element.type;
            delete element.tradable_chain_id;
            delete element.rhs_tradability;
            delete element.fractional_tradability;
            delete element.default_collar_fraction;
            delete element.tradeable;
            delete element.tradability;

            if (element.symbol === "DIS") {
              console.log("disney is here.");
            }
            if (element.symbol === "MSFT") {
              console.log("MICROSOFT is here.");
            }
            saveAllInstruments.push(element);
          }
          counter++;
          nextInLine(authToken, firstResponse.data.next);
        } else {
          await emptyDB();
          await fillDB();
          console.log("ENTERED INTO DB");
        }
      } catch (err) {
        console.log("errorOne", err);
      }
    } catch (err) {
      console.log("errTwo", err);
    }
  })();

  async function nextInLine(authToken, nextUrl) {
    console.log("counter: ", counter);

    const nextResponse = await axios(nextUrl, {
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
    });
    if (!nextResponse.data.next) {
      await emptyDB();

      for (let z = 0; z < saveAllInstruments.length; z++) {
        const element = saveAllInstruments[z];
        if (element.symbol === "DIS") console.log("element", element);
        if (element.symbol === "MSFT") console.log("element", element);
      }
      await fillDB(saveAllInstruments);
      console.log("ENTERED INTO DB");
    } else {
      console.log(nextResponse.data.next);
      for (let j = 0; j < nextResponse.data.results.length; j++) {
        const element = nextResponse.data.results[j];
        delete element.simple_name;
        delete element.market;
        delete element.state;
        delete element.quote;
        delete element.splits;
        delete element.bloomberg_unique;
        delete element.margin_initial_ratio;
        delete element.maintenance_ratio;
        delete element.country;
        delete element.day_trade_ratio;
        delete element.list_date;
        delete element.min_tick_size;
        delete element.type;
        delete element.tradable_chain_id;
        delete element.rhs_tradability;
        delete element.fractional_tradability;
        delete element.default_collar_fraction;
        delete element.tradeable;
        delete element.tradability;
        if (element.symbol === "DIS") {
          console.log("disney is here.");
        }
        if (element.symbol === "MSFT") {
          console.log("MICROSOFT is here.");
        }
        saveAllInstruments.push(element);
      }
      counter++;
      nextInLine(authToken, nextResponse.data.next);
    }
  }
  function getDoc() {
    return new Promise((resolve, reject) => {
      db.rhood.find(function (err, data) {
        err ? reject(err) : resolve(data);
      });
    });
  }
  function emptyDB() {
    return new Promise(function (resolve) {
      db.rhood.update(
        { _id: "5d7c83c37c213e60b8fdbacf" },
        { $set: { data: [] } },
        resolve,
        false,
        true
      );
    });
  }
  function fillDB(saveInstrumentsToDB) {
    return new Promise(function (resolve) {
      console.log("fill db function", saveInstrumentsToDB.length);

      const arr1 = [];
      const arr2 = [];
      const arr3 = [];
      const arr4 = [];
      const arr5 = [];
      const arr6 = [];
      const arr7 = [];
      const arr8 = [];
      const arr9 = [];
      const arr10 = [];
      const arr11 = [];
      const arr12 = [];
      const arr13 = [];
      const arr14 = [];
      const arr15 = [];
      for (let z = 0; z < saveInstrumentsToDB.length; z++) {
        const element = saveInstrumentsToDB[z];
        if (z <= 1000) arr1.push(element);
        if (z > 1000 && z <= 2000) arr2.push(element);
        if (z > 2000 && z <= 3000) arr3.push(element);
        if (z > 3000 && z <= 4000) arr4.push(element);
        if (z > 4000 && z <= 5000) arr5.push(element);
        // if (z > 12000 && z <= saveInstrumentsToDB.length) arr6.push(element);
        if (z > 5000 && z <= 6000) arr6.push(element);
        if (z > 6000 && z <= 7000) arr7.push(element);
        if (z > 7000 && z <= 8000) arr8.push(element);
        if (z > 8000 && z <= 9000) arr9.push(element);
        if (z > 9000 && z <= 10000) arr10.push(element);
        if (z > 10000 && z <= 11000) arr11.push(element);
        if (z > 11000 && z <= 12000) arr12.push(element);
        if (z > 12000 && z <= 13000) arr13.push(element);
        if (z > 13000 && z <= 14000) arr14.push(element);
        if (z > 14000 && z <= saveInstrumentsToDB.length) arr15.push(element);
      }

      var jsonContent1 = JSON.stringify(arr1);
      var jsonContent2 = JSON.stringify(arr2);
      var jsonContent3 = JSON.stringify(arr3);
      var jsonContent4 = JSON.stringify(arr4);
      var jsonContent5 = JSON.stringify(arr5);
      var jsonContent6 = JSON.stringify(arr6);
      var jsonContent7 = JSON.stringify(arr7);
      var jsonContent8 = JSON.stringify(arr8);
      var jsonContent9 = JSON.stringify(arr9);
      var jsonContent10 = JSON.stringify(arr10);
      var jsonContent11 = JSON.stringify(arr11);
      var jsonContent12 = JSON.stringify(arr12);
      var jsonContent13 = JSON.stringify(arr13);
      var jsonContent14 = JSON.stringify(arr14);
      var jsonContent15 = JSON.stringify(arr15);

      fs.writeFile(
        "./connection/config/json/test1.json",
        jsonContent1,
        "utf8",
        resolve
      );
      fs.writeFile(
        "./connection/config/json/test2.json",
        jsonContent2,
        "utf8",
        resolve
      );
      fs.writeFile(
        "./connection/config/json/test3.json",
        jsonContent3,
        "utf8",
        resolve
      );
      fs.writeFile(
        "./connection/config/json/test4.json",
        jsonContent4,
        "utf8",
        resolve
      );
      fs.writeFile(
        "./connection/config/json/test5.json",
        jsonContent5,
        "utf8",
        resolve
      );
      fs.writeFile(
        "./connection/config/json/test6.json",
        jsonContent6,
        "utf8",
        resolve
      );
      fs.writeFile(
        "./connection/config/json/test7.json",
        jsonContent7,
        "utf8",
        resolve
      );
      fs.writeFile(
        "./connection/config/json/test8.json",
        jsonContent8,
        "utf8",
        resolve
      );
      fs.writeFile(
        "./connection/config/json/test9.json",
        jsonContent9,
        "utf8",
        resolve
      );
      fs.writeFile(
        "./connection/config/json/test10.json",
        jsonContent10,
        "utf8",
        resolve
      );
      fs.writeFile(
        "./connection/config/json/test11.json",
        jsonContent11,
        "utf8",
        resolve
      );
      fs.writeFile(
        "./connection/config/json/test12.json",
        jsonContent12,
        "utf8",
        resolve
      );
      fs.writeFile(
        "./connection/config/json/test13.json",
        jsonContent13,
        "utf8",
        resolve
      );
      fs.writeFile(
        "./connection/config/json/test14.json",
        jsonContent14,
        "utf8",
        resolve
      );
      fs.writeFile(
        "./connection/config/json/test15.json",
        jsonContent15,
        "utf8",
        resolve
      );

      // saveInstrumentsToDB.forEach((instrument) => {
      //   if (instrument.symbol === "DIS") {
      //     console.log("disney DB.");
      //   }
      //   if (instrument.symbol === "MSFT") {
      //     console.log("MICROSOFT DB.");
      //   }
      //   db.rhood.update(
      //     { _id: "5d7c83c37c213e60b8fdbacf" },
      //     { $push: { data: instrument } },
      //     resolve,
      //     false,
      //     true
      //   );
      // });
    });
  }
};
// =======================

module.exports.syncInstruments = async function () {
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
      const myInstruments = await axios(
        "https://api.robinhood.com/positions/?nonzero=true",
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

      await emptyDBWithStocks().then(console.log('emptied'));
      
      myInstruments.data.results.forEach((instrument) => {
        // if (instrument.symbol === "DIS") {
        //   console.log("disney DB.");
        // }
        (async function () {
          await fillDBWithStocks(instrument).then(console.log('last'));
        })();
      });
    } catch (err) {
      console.log("stocks err", err);
    }
  } catch (err) {
    console.log("stocks err", err);
  }
};

function fillDBWithStocks(eachInstrument) {
  return new Promise(function (resolve) {
    db.stocks.update(
      { _id: "5d7c83c37c213e60b8fdbacf" },
      { $push: { data: eachInstrument } },
      resolve,
      false,
      true
    );
  });
}
function emptyDBWithStocks() {
  return new Promise(function (resolve) {
    db.stocks.update(
      { _id: "5d7c83c37c213e60b8fdbacf" },
      { $set: { data: [] } },
      resolve,
      false,
      true
    );
  });
}
