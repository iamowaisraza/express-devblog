import express from "express";
import { idSchema } from "../validators/post.schema";
import { validate } from "../middlewares/validate.middleware";
import { home, create, detail, edit } from "./../controllers/pageController.controller";

const pageRouter = express.Router();

pageRouter.route("/").get(home);
pageRouter.route("/create").get(create);
pageRouter.route("/post/:id").get(validate(idSchema), detail);
pageRouter.route("/edit/:id").get(validate(idSchema), edit);

export default pageRouter;
