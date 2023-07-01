import express from "express";
import fs from "fs";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
  photoCreateValidation,
  modelCreateValidation,
  shortsCreateValidation,
} from "./validations.js";

import { handleValidationErrors, checkAuth } from "./utils/index.js";

import {
  UserController,
  PostController,
  CategoryController,
  ModelController,
  GifGenerate,
  ShortsController,
} from "./controllers/index.js";

const PORT = 4444;
const dbUrl =
  "mongodb+srv://bobBegimot:blackWoods2@cluster69.zrzr9lx.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbUrl)
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/generates", express.static("generates"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/users", UserController.getAllUsers);
app.get("/user/:id", UserController.getFindUser);

app.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  } catch (error) {
    console.log(error.message);
  }
});
app.post("/generate", upload.single("image"), GifGenerate.createGif);
app.post("/gen", upload.single("image"), GifGenerate.createGifTest);

app.get("/tags", PostController.getLastTags);

app.get("/shorts", ShortsController.getAllShorts);
app.get("/posts/tags", PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);

app.post(
  "/posts",
  /* checkAuth, */
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.post(
  "/shorts",
  shortsCreateValidation,
  handleValidationErrors,
  ShortsController.createShorts
);
app.post(
  "/category",
  /* checkAuth, */
  /* categoryCreateValidation, */
  handleValidationErrors,
  CategoryController.createCategory
);
app.post(
  "/model",
  checkAuth,
  modelCreateValidation,
  handleValidationErrors,
  ModelController.createModel
);
app.get(
  "/posts",
  /* checkAuth, */
  handleValidationErrors,
  PostController.getAllPostUser
);

app.get(
  "/search/:search",
  handleValidationErrors,
  PostController.findPostsToSearch
);
app.get("/top", handleValidationErrors, PostController.getTopViews);

app.get("/random", handleValidationErrors, PostController.getRandom);

app.get("/category", handleValidationErrors, CategoryController.getAll);

app.get(
  "/category/:id",
  handleValidationErrors,
  CategoryController.getFindCategory
);
app.get(
  "/find/:category",
  handleValidationErrors,
  CategoryController.getFindCategoryByName
);

app.get(
  "/find/category/:category",
  handleValidationErrors,
  CategoryController.getFindCategoryId
);
app.get(
  "/find/random/:category",
  handleValidationErrors,
  CategoryController.getFindCategoryByNameToRandom
);

app.get("/model", handleValidationErrors, ModelController.getAllModel);
app.get("/model/:id", handleValidationErrors, ModelController.getFindModel);

app.patch(
  "/users/:id/addpost",
  checkAuth,
  photoCreateValidation,
  handleValidationErrors,
  UserController.addPost
);

app.delete("/posts/:id", checkAuth, PostController.remove);
app.delete("/shorts/:id", ShortsController.remove);
app.delete("/category/:id", checkAuth, CategoryController.remove);

app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

app.listen(PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK " + PORT);
});
