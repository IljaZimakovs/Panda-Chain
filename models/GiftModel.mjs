import mongoose from "mongoose";

const GiftSchema = new mongoose.Schema({
  userId: {
    type: Number,
  },
  revenuecat_userId: {
    type: String,
  },
  gift_title: {
    type: String,
  },
  start_subsciption: {
    type: Number,
  },
  end_subsciption: {
    type: Number,
  },
  payment: {
    type: String,
  },
  cost: {
    type: String,
  },
},
{
  collection: "pandachain.gift_schema",
});

const Gift = mongoose.model("Gift", GiftSchema);

export default Gift;
