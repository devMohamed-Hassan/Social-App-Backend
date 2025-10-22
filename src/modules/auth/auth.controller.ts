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
  updateEmail: "/update-email",
  confirmEmailUpdate: "/confirm-email-update",
  enableTwoFactor: "/enable-2fa",
  confirmEnable2FA: "/confirm-enable-2fa",
  login2FA: "/login-2fa",
  disable2FA: "/disable-2fa",
  confirmDisable2FA: "/confirm-disable-2fa",
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
  routes.updatePassword,
  authenticate,
  validate(validation.updatePasswordSchema),
  authServices.updatePassword
);

authRouter.patch(
  routes.updateEmail,
  authenticate,
  validate(validation.updateEmailSchema),
  authServices.updateEmail
);

authRouter.post(
  routes.confirmEmailUpdate,
  authenticate,
  validate(validation.confirmEmailUpdateSchema),
  authServices.confirmEmailUpdate
);

authRouter.post(
  routes.enableTwoFactor,
  authenticate,
  authServices.enable2FARequest
);

authRouter.post(
  routes.confirmEnable2FA,
  authenticate,
  validate(validation.confirmEnable2FASchema),
  authServices.confirmEnable2FA
);

authRouter.post(
  routes.login2FA,
  validate(validation.Login2FASchema),
  authServices.login2FA
);

authRouter.post(routes.disable2FA, authenticate, authServices.disable2FA);

authRouter.post(
  routes.confirmDisable2FA,
  authenticate,
  validate(validation.confirmDisable2FASchema),
  authServices.confirmDisable2FA
);

export default authRouter;
