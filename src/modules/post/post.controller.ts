import { authenticate } from "../../middlewares/authenticate.middleware";
import { upload } from "../../middlewares/multer.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { PostServices } from "./post.service";
import { Router } from "express";
import {
  createPostSchema,
  postIdSchema,
  reactToPostSchema,
  updatePostSchema,
} from "./post.validation";
import commentRouter from "../comment/comment.controller";

const postRouter = Router();
const postServices = new PostServices();

const routes = {
  createPost: "/",
  getAllPosts: "/",
  getPostById: "/:id",
  updatePost: "/:id",
  deletePost: "/:id",
  reactToPost: "/:id/react",
  freezePost: "/:id/freeze",
  comments: "/:id/comments",
};

postRouter.post(
  routes.createPost,
  authenticate,
  upload.array("images", 5),
  validate(createPostSchema),
  postServices.createPost
);

postRouter.get(routes.getAllPosts, authenticate, postServices.getAllPosts);

postRouter.get(
  routes.getPostById,
  authenticate,
  validate(postIdSchema),
  postServices.getPostById
);

postRouter.put(
  routes.updatePost,
  authenticate,
  upload.array("images", 5),
  validate(updatePostSchema),
  postServices.updatePost
);

postRouter.delete(
  routes.deletePost,
  authenticate,
  validate(postIdSchema),
  postServices.deletePost
);

postRouter.patch(
  routes.freezePost,
  authenticate,
  validate(postIdSchema),
  postServices.freezePost
);

postRouter.post(
  routes.reactToPost,
  authenticate,
  validate(reactToPostSchema),
  postServices.reactToPost
);

postRouter.use(
  routes.comments,
  authenticate,
  validate(postIdSchema),
  commentRouter
);

export default postRouter;
