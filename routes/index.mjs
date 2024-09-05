import express from "express";
import {
  fetchUserInfo,
  updateConnectWallet,
  followTwitter,
  followTelegram,
  fetchFriendLists,
  followReTweet,
  followTwitterPost,
  verifyUsername,
  verifyAccount,
} from "../Controllers/UserController.mjs";
import { clickNewPoint, fetchPointById, clickMysteryBox } from "../Controllers/PointController.mjs";
import { dailyCheckIn, dailyCheckInAvailable } from "../Controllers/DailyCheckController.mjs";

const router = express.Router();

router.get("/get-user/:id", fetchUserInfo);
router.get("/get-friends/:id", fetchFriendLists)
router.post("/connect-wallet", updateConnectWallet);
router.post("/follow_twitter", followTwitter);
router.post("/follow-telegram", followTelegram);
router.post("/follow-retweet", followReTweet);
router.post("/follow-tpost", followTwitterPost);
router.post("/verify-username", verifyUsername);
router.post("/verify-account", verifyAccount);
router.post('/click-point', clickNewPoint);
router.get('/get-point/:id', fetchPointById)
router.post('/click-mystery', clickMysteryBox)
router.post('/checkin', dailyCheckIn);
router.get('/checkin/status/:id', dailyCheckInAvailable)

export default router;
