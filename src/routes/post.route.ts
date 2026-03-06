import express from "express";
import { addPost, deletePost, getAllPost, reload, updatePost } from "./../controllers/postController.controller";
import { checkIdHandler } from "../middlewares/checkId.middleware";
import { checkBody } from "../middlewares/checkBody.middleware";

const postRouter = express.Router();

postRouter.param("id", checkIdHandler);
postRouter.route("/").get(getAllPost).post(checkBody, addPost);
postRouter.route("/reload").get(reload);
postRouter.route("/:id").put(checkBody, updatePost).delete(deletePost);

export default postRouter;
