import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  paylasanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "Bir paylaşan olmalı",
  },
  paylasimId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: "Bir paylaşım olmalı",
  },
  yorum: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
    required: "Must have start date - default value is the created date",
  },
});

export default mongoose.model("Comment", commentSchema);
