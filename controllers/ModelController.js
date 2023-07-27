import ModelModel from "../models/Model.js";
import PostModel from "../models/Post.js";

export const getAllModel = async (req, res) => {
  try {
    let model = await ModelModel.find({
      name: new RegExp(req.query.search, "i"),
    });
    res.json(model);
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

export const remove = async (req, res) => {
  try {
    const modelId = req.params.id;

    ModelModel.findOneAndDelete(
      {
        _id: modelId,
      },

      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить Model",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Модель не найдена",
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось delete Модель",
    });
  }
};

export const getFindModelByName = async (req, res) => {
  const modelFind = await ModelModel.find({
    model: req.params.model,
  });

  const result = await PostModel.find({ model: modelFind[0].model });

  if (!modelFind) {
    return res.status(404).json({
      message: "model not naiden",
    });
  }

  res.json(result);
};
export const getFindModelByNameToRandom = async (req, res) => {
  try {
    let users = await PostModel.aggregate([
      { $match: { model: req.params.model } },
      { $sample: { size: 20 } },
    ]);
    users = Array.from(users);
    res.json(users);
  } catch (error) {
    console.log(error.message);
  }
};

export const getFindModelId = async (req, res) => {
  try {
    const modelFind = await ModelModel.find({
      model: req.params.model,
    });

    if (!modelFind) {
      return res.status(404).json({
        message: "model not naiden",
      });
    }

    res.json(modelFind[0]._id);
  } catch (error) {
    console.log(error.message);
  }
};
