import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    imageCategoryUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", CategorySchema);
