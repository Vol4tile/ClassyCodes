import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  baslik: {
    type: String,
    required: true,
  },
  yazi: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    default: Date.now,
    required: "Must have start date - default value is the created date",
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "Bir paylaşan olmalı",
  },
});

export default mongoose.model("Question", questionSchema);
