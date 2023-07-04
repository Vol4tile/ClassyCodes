import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  baslik: {
    type: String,
    required: true,
  },
  aciklama: {
    type: String,
    required: true,
  },
  resim: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Post", postSchema);
