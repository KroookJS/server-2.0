import ModelModel from "../models/Model.js";
import PostModel from "../models/Post.js";

export const getAllModel = async (req, res) => {
  try {
    let category = await ModelModel.find({
      name: new RegExp(req.query.search, "i"),
    });
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить model",
    });
  }
};

export const getFindModel = async (req, res) => {
  const modelFind = await ModelModel.findById(req.params.id);
  const result = await PostModel.find({ model: modelFind.model });

  if (!modelFind) {
    return res.status(404).json({
      message: "model not naiden",
    });
  }

  res.json(result);
};

export const createModel = async (req, res) => {
  try {
    const doc = new ModelModel({
      model: req.body.model,
      imageModelUrl: req.body.imageModelUrl,
    });

    const model = await doc.save();

    res.json(model);
  } catch (error) {
    console.log(error.message);
  }
};
