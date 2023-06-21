import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";
import ffmpeg from "fluent-ffmpeg";
import { createGif } from "./GifGenerate.js";

/* const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath); */

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить тэги",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    if ("favorite" in req.query) {
      if (req.query.favorite && req.query.favorite.length) {
        let arr = req.query.favorite.split(",");
        posts = posts.filter((item) => arr.includes(item._id.toString()));
      } else {
        posts = [];
      }
    }

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};
export const getFavorite = async (req, res) => {
  try {
    let posts = await PostModel.find({
      name: new RegExp(req.query.search, "i"),
    });

    if ("favorite" in req.query) {
      if (req.query.favorite && req.query.favorite.length) {
        let arr = req.query.favorite.split(",");
        posts = posts.filter((item) => arr.includes(item._id.toString()));
      } else {
        posts = [];
      }
    }
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
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

    PostModel.findOneAndDelete(
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

export const create = async (req, res) => {
  try {
    /* const timeVideo = req.body.time; */

    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      videoUrl: req.body.videoUrl,
      privUrl: req.body.privUrl,
      privVideoUrl: req.body.privVideoUrl,
      tags: req.body.tags.split(","),
      category: req.body.category.split(","),
      user: req.body.userId,
      /* model: req.body.model.split(","), */
    });

    const post = await doc.save();

    UserModel.findByIdAndUpdate(
      {
        _id: req.body.userId,
      },
      {
        $push: { videos: post._id },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось добавиь в usera id",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Статья не найдена",
          });
        }
        // Попробуй закоментить
        /*    res.json({
          success: "Успех мой второе имя",
        }); */
      }
    );

    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};
export const createPhoto = async (req, res) => {
  try {
    const doc = new PostModel({
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось загрузить фото",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
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

export const getAllPostUser = async (req, res) => {
  try {
    let users = await PostModel.find().sort({ createdAt: -1 });

    if ("favorite" in req.query) {
      if (req.query.favorite && req.query.favorite.length) {
        let arr = req.query.favorite.split(",");
        users = users.filter((item) => arr.includes(item._id.toString()));
      } else {
        users = [];
      }
    }

    users = Array.from(users);

    res.json(users);
  } catch (error) {
    console.log(err.message);
    res.status(500).json({
      message: "Не удалось получить посты пользователя",
    });
  }
};

export const findPostsToSearch = async (req, res) => {
  try {
    /*   let searchPosts = await PostModel.find({
      $or: [
        { title: { $regex: req.body.search } },
        { text: { $regex: req.body.search } },
        { category: { $regex: req.body.search } },
      ],
    }); */

    let searchPost = await PostModel.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: req.params.search, $options: "i" } },
            { text: { $regex: req.params.search, $options: "i" } },
            { category: { $regex: req.params.search, $options: "i" } },
          ],
        },
      },
    ]);

    res.json(searchPost);
  } catch (error) {
    console.log(error.message);
  }
};

export const getTopViews = async (req, res) => {
  try {
    let users = await PostModel.find().sort({ viewsCount: 1 });

    users = Array.from(users);

    res.json(users);
  } catch (error) {
    console.log(err.message);
    res.status(500).json({
      message: "Не удалось получить посты пользователя",
    });
  }
};
export const getRandom = async (req, res) => {
  try {
    let users = await PostModel.aggregate([{ $sample: { size: 20 } }]);

    users = Array.from(users);

    res.json(users);
  } catch (error) {
    cftfgv;
    console.log(err.message);
    res.status(500).json({
      message: "Не удалось получить посты пользователя",
    });
  }
};
