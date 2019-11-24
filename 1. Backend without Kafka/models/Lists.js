const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    listID: String,
    list_Name: String,
    ownerID: String,
    subscribers: Array,
    members: Array,
    make_Private: String,
    list_Desc: String
  },
  { timestamps: true }
);

module.exports = lists = mongoose.model("lists", ListSchema);
