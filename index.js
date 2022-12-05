const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;
const db = require("./assets/data/komentar.json");
const bodyParser = require("body-parser");
const fs = require("fs");
const dbpassword = "sJrncOiHkkyT2XdC";
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://eldfgsebrmxtttlgdqit.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsZGZnc2Vicm14dHR0bGdkcWl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAxOTkyOTksImV4cCI6MTk4NTc3NTI5OX0.85GidDshJWbU3Kg3CL6D4Kdy2omSa8vVBF6h71Qyv4A";
const supabase = createClient(supabaseUrl, supabaseKey);

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
app.get("/tujuan", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/tujuan.html"));
});
app.get("/komentar", async (req, res) => {
  let { data: komentar, error } = await supabase.from("komentar").select("*");
  res.json(komentar);
});
app.post("/komentar", async (req, res) => {
  const { data, error } = await supabase.from("komentar").insert([req.body]);
  res.json({
    message: "success",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
