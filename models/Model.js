import mongoose from "mongoose";

const ModelSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
    },
    imageModelUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Model", ModelSchema);
