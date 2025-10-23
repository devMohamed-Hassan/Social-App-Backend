export enum EmailEventType {
  ConfirmEmail = "confirmEmail",
  ForgotPassword = "forgotPassword",
  ChangeEmail = "changeEmail",
  WelcomeEmail = "welcomeEmail",
  PasswordChanged = "passwordChanged",
  EmailChanged = "emailChanged",
  LoginAlert = "loginAlert",
  AccountDeleted = "accountDeleted",
  Enable2FA = "enable2FA",
  Disable2FA = "disable2FA",
  Disable2FAConfirmed = "disable2FAConfirmed",
  Login2FA = "login2FA",
  UserTagged = "userTagged",
}

export interface EmailConfig {
  subject: string;
  message: string;
  expiryMinutes: number;
}

export const emailEvents: Record<EmailEventType, EmailConfig> = {
  [EmailEventType.WelcomeEmail]: {
    subject: "Welcome to Social App 🎉",
    message: "We’re excited to have you on board! Start exploring today.",
    expiryMinutes: 0,
  },
  [EmailEventType.ConfirmEmail]: {
    subject: "Please confirm your email",
    message:
      "Welcome to Social App! To complete your registration, use the secure verification code below:",
    expiryMinutes: 5,
  },
  [EmailEventType.ForgotPassword]: {
    subject: "Password Reset Request",
    message:
      "We received a request to reset your password. Use the OTP below to proceed:",
    expiryMinutes: 5,
  },
  [EmailEventType.ChangeEmail]: {
    subject: "Confirm your new email address",
    message:
      "We received a request to change your email address on Social App. To confirm this change, please use the verification code below:",
    expiryMinutes: 5,
  },
  [EmailEventType.PasswordChanged]: {
    subject: "Your password has been changed",
    message:
      "Your password was successfully updated. If this wasn’t you, please reset your password immediately.",
    expiryMinutes: 0,
  },
  [EmailEventType.EmailChanged]: {
    subject: "Your email address has been changed",
    message:
      "Your account email address was recently changed. If you didn’t make this change, please contact support immediately.",
    expiryMinutes: 0,
  },
  [EmailEventType.LoginAlert]: {
    subject: "New login detected",
    message:
      "A new login to your account was detected. If this was you, no action is needed. Otherwise, please reset your password.",
    expiryMinutes: 0,
  },
  [EmailEventType.AccountDeleted]: {
    subject: "Your account has been deleted",
    message:
      "Your account has been successfully deleted. We’re sorry to see you go! If you didn’t request this, please contact support immediately.",
    expiryMinutes: 0,
  },
  [EmailEventType.Enable2FA]: {
    subject: "Enable Two-Step Verification",
    message:
      "You requested to enable Two-Step Verification on your Social App account. Use the OTP below to confirm this action:",
    expiryMinutes: 5,
  },
  [EmailEventType.Login2FA]: {
    subject: "Your Login Verification Code",
    message:
      "We detected a login attempt to your Social App account. Use the following OTP to complete your sign-in:",
    expiryMinutes: 5,
  },
  [EmailEventType.Disable2FA]: {
    subject: "Confirm disabling Two-Step Verification",
    message:
      "We received a request to disable Two-Step Verification (2FA) on your account. " +
      "If this was you, please confirm by entering the verification code below. " +
      "If this wasn’t you, ignore this email or contact support immediately.",
    expiryMinutes: 5,
  },
  [EmailEventType.Disable2FAConfirmed]: {
    subject: "Two-Step Verification Disabled",
    message:
      "Two-Step Verification (2FA) has been successfully disabled on your account. " +
      "If you didn't make this change, please enable 2FA again immediately or contact our support team for assistance.",
    expiryMinutes: 0,
  },
  [EmailEventType.UserTagged]: {
    subject: "You've been tagged in a post!",
    message:
      "Someone has tagged you in a post on Social App! Check out what they shared and join the conversation.",
    expiryMinutes: 0,
  },
};
