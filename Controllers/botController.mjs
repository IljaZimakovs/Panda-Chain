import User from "../models/userModel.mjs";
import Sequence from "../models/sequenceModal.mjs";
import { Bot, InlineKeyboard } from "grammy";
import { getNextSequenceValue } from "../utils/sequence.mjs";

const startTGBot = () => {
  const paidUsers = new Map();
  const bot = new Bot(process.env.TELEGRAM_BOT_API_KEY);

  bot.on("message:text", async (ctx) => {
    const messageText = ctx.message.text;
    // Regular expression to match /start command with an optional parameter
    const startCommandRegex = /^\/start(?:\s+(.+))?$/;
    const match = messageText.match(startCommandRegex);

    if (match) {
      const referrer_userId = match[1];

      if (referrer_userId) {
        const username = ctx.from.username;
        const userId = ctx.from.id;
        const first_name = ctx.from.first_name;
        const last_name = ctx.from.last_name;

        try {
          const user = await User.findOne({ userId: userId });
          if (userId == referrer_userId) {
            const welcomeMessage = username
              ? `Hi @${username}! excuse me, you can not invite yourself.`
              : `Hi! excuse me, you can not invite yourself.`;

            ctx.reply(welcomeMessage);

            return;
          }

          if (!user) {
            const sequenceNumber = await getNextSequenceValue();

            const newUser = new User({
              userId: userId,
              username: username,
              first_name: first_name,
              last_name: last_name,
              sequence_no: sequenceNumber
            });

            await newUser.save();
          } else {
            console.log("This user already exists.");
          }

          const referral = await User.findOne({ userId: userId });
          if (referral.referrer_userId) {
            console.log('You cannot invite this user');
          } else {
            await User.findOneAndUpdate(
              { userId: userId },
              { $set: { referrer_userId: Number(referrer_userId) } },
              { new: true }
            );
          }

          const welcomeMessage = username
            ? `Hi @${username}! Welcome our XS VPN! 🎉`
            : `Hi! Welcome our XS VPN! 🎉`;

          ctx.reply(welcomeMessage, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Open App",
                    web_app: { url: "https://xs-vpn.vercel.app/" },
                  },
                ],
              ],
            },
          });
        } catch (error) {
          console.error("Database error:", error);
          ctx.reply("An error occurred while processing your request.");
        }
      } else {
        const username = ctx.from.username;
        const userId = ctx.from.id;
        const first_name = ctx.from.first_name;
        const last_name = ctx.from.last_name;

        try {
          const user = await User.findOne({ userId: userId });

          if (!user) {
            const sequenceNumber = await getNextSequenceValue();

            const newUser = new User({
              userId: userId,
              username: username,
              first_name: first_name,
              last_name: last_name,
              sequence_no: sequenceNumber
            });

            await newUser.save();
          } else {
            console.log("This user already exists.");
          }
          const welcomeMessage = username
            ? `Hi @${username}! Welcome our service! 🎉`
            : `Hi! Welcome our service! 🎉`;

          ctx.reply(welcomeMessage, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Open App",
                    web_app: { url: "https://pandachain-io.vercel.app/" },
                  },
                ],
              ],
            },
          });
        } catch (error) {
          console.error("Database error:", error);
          ctx.reply("An error occurred while processing your request.");
        }
      }
    }
  });

  bot.start();

  console.log("Bot server started in the polling mode...");
};

export default startTGBot;
