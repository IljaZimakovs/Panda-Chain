import mongoose from "mongoose";

const DailyCheckSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
    },
    lastCheckIn: { type: Date, required: true },
    points: { type: Number, default: 50 },
    streak: { type: Number, default: 0 }
},
    {
        collection: "pandachain.daily_checks",
    })

const DailyCheck = mongoose.model("dailycheck", DailyCheckSchema);

export default DailyCheck;
