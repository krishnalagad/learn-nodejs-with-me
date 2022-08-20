const express = require("express");
const coursesRouter = require("./routes/courses");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use("/api/courses", coursesRouter);

mongoose.connect(process.env.DB_CONNECTION_URL, ()=>{
    console.log("Connected to db..");
});

app.listen(process.env.PORT, () => {
  console.log("Server listening on port");
});
