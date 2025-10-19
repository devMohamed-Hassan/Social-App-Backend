import { Router } from "express";
import { AuthServices } from "./auth.service";
import { validate } from "../../middlewares/validate.middleware";
import * as validation from "./auth.validation";
import { authenticate } from "../../middlewares/authenticate.middleware";

const authRouter = Router();
const authServices = new AuthServices();

const routes = {
  signup: "/signup",
  confirmEmail: "/confirm-email",
  resendEmailOtp: "/resend-email-otp",
  login: "/login",
  refreshToken: "/refresh-token",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  updatePassword: "/update-password",
  requestEmailUpdate: "/request-email-update",
  confirmEmailUpdate: "/confirm-email-update",
};

authRouter.post(
  routes.signup,
  validate(validation.signupSchema),
  authServices.signup
);

authRouter.post(
  routes.confirmEmail,
  validate(validation.confirmEmailSchema),
  authServices.confirmEmail
);

authRouter.post(
  routes.resendEmailOtp,
  validate(validation.resendEmailOTPSchema),
  authServices.resendEmailOtp
);

authRouter.post(
  routes.login,
  validate(validation.loginSchema),
  authServices.login
);

authRouter.post(routes.refreshToken, authServices.refreshToken);

authRouter.post(
  routes.forgotPassword,
  validate(validation.forgotPasswordSchema),
  authServices.forgotPassword
);

authRouter.patch(
  routes.resetPassword,
  validate(validation.resetPasswordSechma),
  authServices.resetPassword
);

authRouter.patch(
export default authRouter;
