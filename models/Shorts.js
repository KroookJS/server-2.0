import mongoose from "mongoose";

const ShortsSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
    type: String,
    viewsCount: {
      type: Number,
      default: 0,
    },
    /*     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, */
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Shorts", ShortsSchema);
