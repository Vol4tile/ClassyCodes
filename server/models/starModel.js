import mongoose from "mongoose";

const starSchema = mongoose.Schema({
  starBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "Bir paylaşan olmalı",
  },
  paylasimId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: "Bir paylaşım olmalı",
  },
  createDate: {
    type: Date,
    default: Date.now,
    required: "Must have start date - default value is the created date",
  },
});

export default mongoose.model("Star", starSchema);
