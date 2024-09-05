import Point from "../models/pointModal.mjs";
import User from "../models/userModel.mjs";

let positiveCount = 0;
let negativeCount = 0;
let totalClicks = 0;
let randomPoint;

function generateRandomPoint() {
    if (totalClicks < 10) {
        if (positiveCount < 7 && negativeCount < 3) {
            if (Math.random() < 0.7) {
                randomPoint = Math.floor(Math.random() * 20) + 1; // Positive point between 1 and 20
                positiveCount++;
            } else {
                randomPoint = Math.floor(Math.random() * 20) - 20; // Negative point between -1 and -17
                negativeCount++;
            }
        } else if (positiveCount >= 7) {
            // Only generate negative points if already 7 positives
            randomPoint = Math.floor(Math.random() * 20) - 20;
            negativeCount++;
        } else if (negativeCount >= 3) {
            // Only generate positive points if already 3 negatives
            randomPoint = Math.floor(Math.random() * 20) + 1;
            positiveCount++;
        }
        totalClicks++;
    } else {
        positiveCount = 0;
        negativeCount = 0;
        totalClicks = 0;
    }

    return randomPoint;
}

const clickNewPoint = async (req, res) => {
    const { user_id } = req.body;

    const plusPointText = ["Bamboo-tastic!", "Earn Panda Points"];
    const minusPointText = ["Bamboo-zled! Try again", "That bamboo shoot fell short..."];

    try {
        const point = generateRandomPoint()

        const getRandomText = (array) => array[Math.floor(Math.random() * array.length)];

        let chosenText;

        if (point > 0) {
            chosenText = getRandomText(plusPointText);
        } else {
            chosenText = getRandomText(minusPointText);
        }

        const newPoint = new Point({
            userId: user_id,
            text: chosenText,
            point: point,
        });

        await newPoint.save();

        const newUser = await User.findOneAndUpdate(
            { userId: user_id },
            {
                $inc: { score: point },
            },
            { new: true }
        );

        res.status(200).json({ newPoint, score: newUser.score });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

const fetchPointById = async (req, res) => {
    const userId = req.params.id;

    try {
        const points = await Point.find({ userId: userId });

        res.status(200).json(points);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

const clickMysteryBox = async (req, res) => {
    const { user_id } = req.body;

    const point = Math.floor(Math.random() * 550);

    const newUser = await User.findOneAndUpdate(
        { userId: user_id },
        {
            $inc: { score: point, mystery_box: -1 },
        },
        { new: true }
    );

    res.status(200).json({ point: point, totalPoint: newUser.score });
}

export { clickNewPoint, fetchPointById, clickMysteryBox };