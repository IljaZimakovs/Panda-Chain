import DailyCheck from "../models/dailyCheckModal.mjs";
import User from "../models/userModel.mjs";

const dailyCheckIn = async (req, res) => {
    const { user_id } = req.body;
    const currentDate = new Date();

    const daily = await DailyCheck.findOne({ userId: user_id });

    if (!daily) {
        return res.status(404).json({ message: 'User not found' });
    }

    const lastCheckInDate = new Date(daily.lastCheckIn);
    const dayDifference = Math.floor((currentDate - lastCheckInDate) / (1000 * 60 * 60 * 24));

    // daily has checked in consecutively, increase streak
    daily.streak += 1;

    const newUser = await User.findOneAndUpdate(
        { userId: user_id },
        {
            $inc: {
                score: daily.points
            }
        },
        { new: true }
    );

    switch (daily.streak) {
        case 1: daily.points = 100; break;
        case 2: daily.points = 150; break;
        case 3: daily.points = 200; break;
        case 4: daily.points = 300; break;
        case 5: daily.points = 400; break;
        case 6: daily.points = 500; break;
        case 7: daily.points = 50; break;
        default: daily.points = 50;
    }
    if (daily.streak > 7) {
        daily.streak = 1;
    }
    // Update the last check-in date
    daily.lastCheckIn = currentDate;
    await daily.save();

    res.json({
        status: true,
        points: daily.points,
        streak: daily.streak,
        user: newUser
    });
}

const dailyCheckInAvailable = async (req, res) => {
    const userId = req.params.id;
    const currentDate = new Date();
    const daily = await DailyCheck.findOne({ userId: userId });

    if (!daily) {
        return res.status(404).json({ message: 'User not found' });
    }

    const lastCheckInDate = new Date(daily.lastCheckIn);
    const dayDifference = Math.floor((currentDate - lastCheckInDate) / (1000 * 60 * 60 * 24));

    if (dayDifference >= 2) {
        // Missed a day, reset points and streak
        const newDaily = await DailyCheck.findOneAndUpdate(
            { userId: userId },
            {
                $set: { points: 50, streak: 0 },
            },
            { new: true }
        );

        return res.json({ available: true, points: newDaily.points, streak: newDaily.streak });
    } else if (dayDifference === 1) {
        // New daily reward is available
        return res.json({ available: true, points: daily.points, streak: daily.streak });
    } else if (daily.streak === 0) {
        return res.json({ available: true, points: daily.points, streak: daily.streak });
    } else {
        // No new reward available yet (within the same day)
        let _points;

        switch (daily.streak) {
            case 1: _points = 50; break;
            case 2: _points = 100; break;
            case 3: _points = 150; break;
            case 4: _points = 200; break;
            case 5: _points = 300; break;
            case 6: _points = 400; break;
            case 7: _points = 50; break;
            default: _points = 50;
        }
        return res.json({ available: false, points: _points });
    }

}

export { dailyCheckIn, dailyCheckInAvailable }