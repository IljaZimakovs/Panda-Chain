import mongoose from "mongoose";

const SequenceSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true
    },
    sequence_value: {
        type: Number,
        default: 0
    }
})

const Sequence = mongoose.model("Sequence", SequenceSchema);

export default Sequence;
