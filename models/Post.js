import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    category: {
      type: Array,
      default: [],
    },
    model: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      /* required: true, */
    },
    videoUrl: String,
    privUrl: String,
    privVideoUrl: String,
    userAvatar: String,
    userName: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
