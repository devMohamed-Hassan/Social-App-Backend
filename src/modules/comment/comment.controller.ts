import { Router } from "express";
import { CommentServices } from "./comment.service";
import { validate } from "../../middlewares/validate.middleware";
import {
  addCommentSchema,
  addReplySchema,
  deleteCommentSchema,
} from "./comment.validation";

const commentRouter = Router({ mergeParams: true });
const commentServices = new CommentServices();

const routes = {
  getComments: "/",
  addComments: "/",
  addReply: "/:commentIndex/reply",
  deleteComment: "/:commentIndex",
};

commentRouter.get(routes.getComments, commentServices.getCommentsByPost);

commentRouter.post(
  routes.addComments,
  validate(addCommentSchema),
  commentServices.addComment
);

commentRouter.post(
  routes.addReply,
  validate(addReplySchema),
  commentServices.addReply
);

commentRouter.delete(
  routes.deleteComment,
  validate(deleteCommentSchema),
  commentServices.deleteComment
);

export default commentRouter;
