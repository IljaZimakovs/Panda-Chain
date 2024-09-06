import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  country: {
    type: String,
  },
  flag: {
    type: String,
  },
  city: {
    type: String,
  },
  type: {
    type: String,
  },
  download: {
    type: Number,
  },
  upload: {
    type: Number,
  },
  location: {
    type: String,
  },
},
{
  collection: "pandachain.location",
});

const Location = mongoose.model("Location", LocationSchema);

export default Location;
