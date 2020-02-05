const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Project = new Schema(
  {
    project_name: {
      type: String
    },
    project_date: {
      type: String
    },
    project_description: {
      type: String
    },
    project_img: {
      type: String
    }
  },
  {
    collection: "project"
  }
);

module.exports = mongoose.model("Project", Project);
