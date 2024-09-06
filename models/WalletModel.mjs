import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
  wallet_address: {
    type: String,
  },
},
    {
      collection: "pandachain.wallet",
    });

const Wallet = mongoose.model("Wallet", WalletSchema);

export default Wallet;
