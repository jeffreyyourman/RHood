const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.get("/", async (req, res) => {
  res.json({ data: "test" });
});

app.get("/allinstruments", async (req, res) => {
  var getDocument = () => {
    return new Promise((resolve, reject) => {
      db.rhood.find(function (err, data) {
        err ? reject(err) : resolve(data);
      });
    });
  };
  const allInstruments = await getDocument();
  console.log("allInstruments", allInstruments[0].data.length);
  res.json({ allInstruments: allInstruments[0].data });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
