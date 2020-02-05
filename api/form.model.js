const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Form = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    message: {
      type: String
    }
  },
  {
    collection: "form"
  }
);

module.exports = mongoose.model("Form", Form);
