const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;
const db = require("./assets/data/komentar.json");
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/audio", express.static(path.resolve(__dirname, "assets/audio")));
app.use("/font", express.static(path.resolve(__dirname, "assets/font")));
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});
app.get("/komentar", (req, res) => {
  res.json(db);
});
app.post("/komentar", (req, res) => {
  console.log(req.body);
  let database = JSON.parse(
    fs.readFileSync("./assets/data/komentar.json", "utf8")
  );
  // edit or add property
  database.komentar.push(req.body);
  //write file
  fs.writeFileSync("./assets/data/komentar.json", JSON.stringify(database));
  res.json(database);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
