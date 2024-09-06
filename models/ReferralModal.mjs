import mongoose from "mongoose";

const ReferralSchema = new mongoose.Schema({
  referrer_userId: {
    type: Number,
  },
  referred_userId: {
    type: Number,
    unique: true,
  },
  is_premium: {
    type: Boolean,
  },
},
    {
      collection: "pandachain.referral",
    });

const Referral = mongoose.model("Refferal", ReferralSchema);

export default Referral;
