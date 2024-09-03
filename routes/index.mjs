import express from "express";
import {
  fetchUserInfo,
  updateConnectWallet,
  followTwitter,
  fetchFriendLists,
  verifyUsername,
  verifyAccount
} from "../Controllers/UserController.mjs";

const router = express.Router();

router.get("/get-user/:id", fetchUserInfo);
router.get("/get-friends/:id", fetchFriendLists)
router.post("/connect-wallet", updateConnectWallet);
router.post("/follow_twitter", followTwitter);
router.post("/verify-username", verifyUsername);
router.post("/verify-account", verifyAccount);

export default router;
