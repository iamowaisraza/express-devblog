import express from "express";
import { home, create, detail, edit } from "./../controllers/pageController.controller";
import { checkIdHandler } from "../middlewares/checkId.middleware";

const pageRouter = express.Router();

pageRouter.param("id", checkIdHandler);
pageRouter.route("/").get(home);
pageRouter.route("/create").get(create);
pageRouter.route("/post/:id").get(detail);
pageRouter.route("/edit/:id").get(edit);

export default pageRouter;
