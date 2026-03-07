import express from "express";
import { validate } from "../middlewares/validate.middleware";
import { editSchema, idSchema, postSchema } from "../validators/post.schema";
import { getPost, getAllPosts, addPost, editPost, removePost } from "../controllers/postController.controller";

const postRouter = express.Router();

postRouter
  .route("/:id")
  .get(validate(idSchema), getPost)
  .put(validate(editSchema), editPost)
  .delete(validate(idSchema), removePost);
postRouter.route("/").get(getAllPosts).post(validate(postSchema), addPost);

export default postRouter;
