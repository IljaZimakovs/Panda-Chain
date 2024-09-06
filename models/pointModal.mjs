import mongoose from "mongoose";

const PointSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        require: false,
    },
    point: {
        type: Number,
        require: false
    },
},
{
    collection: "pandachain.point",
})

const Point = mongoose.model("Point", PointSchema);

export default Point;
