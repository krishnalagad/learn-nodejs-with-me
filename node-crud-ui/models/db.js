const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/employeedb",
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("Database connection established");
    } else {
      console.log("Database connection failed" + err);
    }
  }
);

require("./employee.model");