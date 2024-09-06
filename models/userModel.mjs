import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  username: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  wallet_address: {
    type: String,
    default: "",
  },
  twitter_follow: {
    type: Boolean,
    default: false
  },
  rt_follow: {
    type: Boolean,
    default: false
  },
  tpost_follow: {
    type: Boolean,
    default: false
  },
  tg_follow: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1
  },
  date: {
    type: Date,
    default: Date.now,
  },
  referrer_userId: {
    type: Number,
    require: false
  },
  verified: {
    type: Boolean,
    default: false
  },
  sequence_no: {
    type: Number,
    require: false
  },
  mystery_box: {
    type: Number,
    default: 0
  }
},
    {
      collection: "pandachain.user",
    });

const User = mongoose.model("User", UserSchema);

export default User;
