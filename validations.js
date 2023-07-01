import { body } from "express-validator";

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
  body("fullName", "Укажите имя").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 3 }).optional().isString(),
  body("text", "Введите текст статьи").isLength({ min: 3 }).isString(),
  body("tags", "Неверный формат тэгов").optional().isString(),
  body("category", "Неверный формат category").optional().isString(),
  body("model", "Неверный формат model").optional().isString(),
  body("videoUrl", "Неверная ссылка на видео").optional().isString(),
  body("privUrl", "Неверная ссылка на изображение").optional().isString(),
  body("privVideoUrl", "Неверная ссылка на привью Видео").optional().isString(),
  body("userId", "Неверный id").optional().isString(),
];
export const photoCreateValidation = [
  body("text", "Введите текст статьи").isLength({ min: 3 }).isString(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];
export const categoryCreateValidation = [
  body("category", "Введите название категории").isLength({ min: 1 }).isString(),
  body("imageCategoryUrl", "Неверная ссылка на изображение").optional().isString(),
];
export const modelCreateValidation = [
  body("model", "Введите name model").isLength({ min: 1 }).isString(),
  body("imageModelUrl", "Неверная ссылка на изображение").optional().isString(),
];
export const shortsCreateValidation = [
  body("url", "Введите url shorts").isLength({ min: 1 }).isString(),
  body("type", "Неверный тип на изображение").optional().isString(),
];
