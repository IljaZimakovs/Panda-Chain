import Sequence from "../models/sequenceModal.mjs";

const getNextSequenceValue = async () => {
  const sequence = await Sequence.findOneAndUpdate(
    { user_id: 123456789 },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );

  return sequence.sequence_value;
};

export { getNextSequenceValue };