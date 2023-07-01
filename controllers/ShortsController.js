import ShortsSchema from "../models/Shorts.js";

export const getAllShorts = async (req, res) => {
  try {
    const shorts = await ShortsSchema.aggregate([{ $sample: { size: 6 } }]);
    res.json(shorts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить фотки",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    ShortsSchema.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось вернуть статью",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Статья не найдена",
          });
        }
        res.json(doc);
      }
    ).populate("user");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const createShorts = async (req, res) => {
  try {
    const doc = new ShortsSchema({
      url: req.body.url,
      type: req.body.type,
    });

    const shorts = await doc.save();

    res.json(shorts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось загрузить shorts",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    ShortsSchema.findOneAndDelete(
      {
        _id: postId,
      },

      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить shorts",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Статья не найдена",
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
      message: "Не удалось получить статьи",
    });
  }
};