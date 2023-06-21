import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    photos: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: [],
    },
    notification: {
      type: Array,
      default: [],
    },
    friends: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Photo", PhotoSchema);
