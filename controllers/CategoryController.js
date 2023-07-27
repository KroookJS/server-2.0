import CategoryModel from "../models/Category.js";
import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    let category = await CategoryModel.find({
      name: new RegExp(req.query.search, "i"),
    });
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить category",
    });
  }
};
export const getFindCategory = async (req, res) => {
  const CategotyFind = await CategoryModel.findById(req.params.id);
  const result = await PostModel.find({ category: CategotyFind.category });

  if (!CategotyFind) {
    return res.status(404).json({
      message: "category not naiden",
    });
  }

  res.json(result);
};

export const createCategory = async (req, res) => {
  try {
    const doc = new CategoryModel({
      category: req.body.category,
      imageCategoryUrl: req.body.imageCategoryUrl,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error.message);
  }
};

export const remove = async (req, res) => {
  try {
    const categoryId = req.params.id;

    CategoryModel.findOneAndDelete(
      {
        _id: categoryId,
      },

      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить category",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "category не найдена",
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
      message: "Не удалось delete category",
    });
  }
};

export const getFindCategoryByName = async (req, res) => {
  const categoryFind = await CategoryModel.find({
    category: req.params.category,
  });

  const result = await PostModel.find({ category: categoryFind[0].category });

  if (!categoryFind) {
    return res.status(404).json({
      message: "category not naiden",
    });
  }

  res.json(result);
};
export const getFindCategoryByNameToRandom = async (req, res) => {
  try {
    let users = await PostModel.aggregate([
      { $match: { category: req.params.category } },
      { $sample: { size: 20 } },
    ]);
    users = Array.from(users);
    res.json(users);
  } catch (error) {
    console.log(error.message);
  }
};
export const getFindCategoryId = async (req, res) => {
  try {
    const categoryFind = await CategoryModel.find({
      category: req.params.category,
    });

    if (!categoryFind) {
      return res.status(404).json({
        message: "category not naiden",
      });
    }

    res.json(categoryFind[0]._id);
  } catch (error) {
    console.log(error.message);
  }
};
