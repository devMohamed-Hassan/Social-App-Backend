import { NextFunction, Request, Response, Router } from "express";
import { UserServices } from "./user.service";
import { sendSuccess } from "../../utils/sendSuccess";
import { authenticate } from "../../middlewares/authenticate.middleware";

const userRouter = Router();
const userServices = new UserServices();

userRouter.get(
  "/me",
  authenticate,
  (req: Request, res: Response, next: NextFunction) => {
    return sendSuccess({
      res,
      statusCode: 200,
      data: { user: req.user },
    });
  }
);

export default userRouter;
