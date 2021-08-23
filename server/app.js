const express = require("express");
const api = require("./routes");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api", api);

module.exports = app;
