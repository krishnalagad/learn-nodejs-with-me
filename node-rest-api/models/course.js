const mongoose = require("mongoose");

const course = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  videos: {
    type: Number,
    required: true,
  },
  active: Boolean,
});

module.exports = mongoose.model("courses", course);