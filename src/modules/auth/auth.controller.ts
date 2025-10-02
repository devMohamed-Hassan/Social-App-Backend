import { Router } from "express";
import { AuthServices } from "./auth.service";
import { validate } from "../../middlewares/validate.middleware";
import { confirmEmailSchema, signupSchema } from "./auth.validation";

const authRouter = Router();
const authServices = new AuthServices();

authRouter.post("/signup", validate(signupSchema), (req, res, next) =>
  authServices.signup(req, res, next)
);

authRouter.post(
  "/confirm-email",
  validate(confirmEmailSchema),
  (req, res, next) => authServices.confirmEmail(req, res, next)
);

export default authRouter;
