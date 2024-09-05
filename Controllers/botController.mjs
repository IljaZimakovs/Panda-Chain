import User from "../models/userModel.mjs";
import Sequence from "../models/sequenceModal.mjs";
import DailyCheck from "../models/dailyCheckModal.mjs";
import { Bot, InlineKeyboard } from "grammy";
import { getNextSequenceValue } from "../utils/sequence.mjs";
const startTGBot = () => {
  const bot = new Bot(process.env.TELEGRAM_BOT_API_KEY);

  const photoUrl = 'https://gateway.pinata.cloud/ipfs/QmaEPwtmmPz3CGP7VrgDMgQ9ZinwPHxSc7UAUw9LwkohzY';

  async function checkSubscription(userId) {
    const chatMember = await bot.api.getChatMember('@PandaChainAnn', userId)
    console.log(chatMember)
    const status = chatMember.status;


    if (status === 'member' || status === 'administrator' || status === 'creator') {
      console.log('User is subscribed');
      return true;
    } else {
      console.log('User is not subscribed');
      return false;
    }
  }

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
              sequence_no: sequenceNumber,
              score: 500
            });

            const newDailyCheck = new DailyCheck({
              userId: userId,
              lastCheckIn: new Date()
            })

            await newUser.save();
            await newDailyCheck.save();
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

            await User.findOneAndUpdate(
              { userId: Number(referrer_userId) },
              { $inc: { mystery_box: 1 } },
              { new: true }
            )
          }

          ctx.replyWithPhoto(photoUrl, {
            caption: `Hey @${username ? username : first_name}, welcome to Pandatopia, the first Optimism-based TON L2 designed to bring liquidity and users from the EVM and Bitcoin ecosystem! Here’s what you can do:\n\n🆓 Join the movement! Let’s unite our voices. Together, we can join DigitalResistance on PandaChain to Free Durov. Click below to sign the petition and be part of something significant!\n\n🔍 Complete Quests Earn generous Panda Points by completing initial and daily tasks.\n\n🐼 Invite Friends Invite friends and get valuable Mystery Boxes for each new panda.\n\n💸 Stay Tuned Panda’s token is coming soon—don’t miss out!`,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Join for Panda Points",
                    web_app: { url: "https://pandachain-io.vercel.app/" },
                  },
                ],
                [
                  {
                    text: "Community",
                    url: "https://t.me/pandachainio"
                  },
                  {
                    text: "Twitter",
                    url: "https://x.com/PandaChain_io"
                  },
                  {
                    text: "Website",
                    url: "https://pandachain.io"
                  },
                ],
                [
                  {
                    text: "💰 How to Earn",
                    callback_data: "how_to_earn"
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
              sequence_no: sequenceNumber,
              score: 500
            });

            const newDailyCheck = new DailyCheck({
              userId: userId,
              lastCheckIn: new Date()
            })

            await newUser.save();
            await newDailyCheck.save();
          } else {
            console.log("This user already exists.");
          }

          ctx.replyWithPhoto(photoUrl, {
            caption: `Hey @${username ? username : first_name}, welcome to Pandatopia, the first Optimism-based TON L2 designed to bring liquidity and users from the EVM and Bitcoin ecosystem! Here’s what you can do:\n\n🆓 Join the movement! Let’s unite our voices. Together, we can join DigitalResistance on PandaChain to Free Durov. Click below to sign the petition and be part of something significant!\n\n🔍 Complete Quests Earn generous Panda Points by completing initial and daily tasks.\n\n🐼 Invite Friends Invite friends and get valuable Mystery Boxes for each new panda.\n\n💸 Stay Tuned Panda’s token is coming soon—don’t miss out!`,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Join for Panda Points",
                    web_app: { url: "https://pandachain-io.vercel.app/" },
                  },
                ],
                [
                  {
                    text: "Community",
                    url: "https://t.me/pandachainio"
                  },
                  {
                    text: "Twitter",
                    url: "https://x.com/PandaChain_io"
                  },
                  {
                    text: "Website",
                    url: "https://pandachain.io"
                  },
                ],
                [
                  {
                    text: "💰 How to Earn",
                    callback_data: "how_to_earn"
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

  bot.on('callback_query:data', async (ctx) => {
    if (ctx.callbackQuery.data === 'how_to_earn') {
      await ctx.answerCallbackQuery();
      await ctx.reply('Complete initial tasks to earn generous Panda Points. Unlock daily quests after finishing all tasks. Daily quests include check-ins (earn more with consecutive check-ins) and more. Stay tuned for exciting partnerships!\n\n🐼🐼 Invite Friends to Earn More\nInvite friends and get a Mystery Box for each new panda. More pandas, more rewards! Each Mystery Box contains valuable Panda Points.\n\n🎉 Poke the Panda for Fun\nTest your luck with a poke! Maybe something, maybe nothing.\n\n💸 Get Ready for Panda’s Token\nBy year’s end, we’ll roll out Panda’s token for our community! Dates will be announced in our updates. Stay tuned!',
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Full version of the guide",
                  url: 'https://medium.com/@PandaChainio/welcome-to-the-world-of-pandachain-5fbbc979117c'
                },
              ]
            ],
          }
        }
      );
    }
  });

  bot.start();

  console.log("Bot server started in the polling mode...");
};

export default startTGBot;
