import PhotoModel from "../models/Photo.js";

export const getAll = async (req, res) => {
  try {
    const photo = await PhotoModel.find().populate("user").exec();
    res.json(photo);
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

    PhotoModel.findOneAndUpdate(
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

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PhotoModel.findOneAndDelete(
      {
        _id: postId,
      },

      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить статью",
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

export const createPhoto = (req, res) => {
  /*   try { */
  /* const doc = new PhotoModel({
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post); */

  console.log(req.body);
  res.json({
    sucsses: true,
  });
  /*  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось загрузить фото",
    });
  } */
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PhotoModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags.split(","),
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};
