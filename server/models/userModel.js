import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true, dropDups: true },
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  createDate: {
    type: Date,
    default: Date.now,
    required: "Must have start date - default value is the created date",
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
});
userSchema.path("email").index({ unique: true });

export default mongoose.model("User", userSchema);
