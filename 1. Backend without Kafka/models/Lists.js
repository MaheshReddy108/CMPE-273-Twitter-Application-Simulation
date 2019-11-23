const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
   listID:String,
   listName :String,
   ownerID:String,
   subscribers:Array,
   members:Array,
   isPrivate:String,
   listDesc:String
  },
  { timestamps: true } 
);

module.exports = lists = mongoose.model("lists", ListSchema);