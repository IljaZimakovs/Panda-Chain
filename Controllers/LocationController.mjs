import Location from "../models/LocationModel.mjs";
import Wallet from "../models/WalletModel.mjs";

const getLocation = async (req, res) => {
  try {
    const locations = await Location.find();

    res.status(200).json(locations);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Fetching locatoin is failed." });
  }
};

const createLocation = async (req, res) => {
  const { flag, country, city, type, download, upload, location } = req.body;

  try {
    const newLocation = new Location({
      flag: flag,
      country: country,
      city: city,
      type: type,
      download: download,
      upload: upload,
      location: location,
    });

    await newLocation.save();

    res.status(200).json({ success: "Creating new locatoin is succesfully." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Creating new locatoin is failed." });
  }
};

const updateLocation = async (req, res) => {
  const _id = req.params.id;
  const updateData = req.body;

  try {
    const updatedUser = await Location.findByIdAndUpdate(
      _id,
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteLocation = async (req, res) => {
  const _id = req.params.id;

  try {
    const deletedLocation = await Location.findByIdAndDelete(_id);

    if (!deletedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.json({ message: "Location deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.find();

    res.status(200).json({ wallet_address: wallet[0].wallet_address });
  } catch (error) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateWallet = async (req, res) => {
  const _id = req.params.id;
  const { wallet_address } = req.body;

  try {
    const updatedWallet = await Wallet.findByIdAndUpdate(
      _id,
      { wallet_address: wallet_address },
      {
        new: true,
      }
    );

    if (!updatedWallet) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedWallet);
  } catch (error) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getLocation,
  createLocation,
  deleteLocation,
  updateLocation,
  updateWallet,
  getWallet,
};
