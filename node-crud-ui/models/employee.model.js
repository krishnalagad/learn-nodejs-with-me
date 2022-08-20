const mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: 'Required field*'
  },
  email: {
    type: String,
    required: 'Required field*'
  },
  mobile: {
    type: String,
  },
  city: {
    type: String,
  },
});

// custome validation
// employeeSchema.path('email').validate((val) => {
//     emailRegex = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
//     return emailRegex.test(val);
// }, 'Invalid email.');

const schemaName = "Employee";
mongoose.model(schemaName, employeeSchema);
