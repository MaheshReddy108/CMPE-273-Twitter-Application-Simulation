const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
   listID:String,
   list_Name :String,
   ownerID:String,
   subscribers: [
    {
      user_id: {
        type: String,
      },
      username: {
        type: String
      }
    }
  ],
   members: [
    {
      user_id: {
        type: String
      },
      username: {
        type: String
      }
    }
  ],
   make_Private:String,
   list_Desc:String
  },
  { timestamps: true } 
);

module.exports = lists = mongoose.model("lists", ListSchema);
