export const OTP_TIMER_KEY = "otp_timer_key";
export const REGISTER_USER_KEY = "register_user_key";
export const OTP_VALIDATION_TIME = "300";
export const OTP_EXPIRATION_TIME = () =>
  (Date.now() + Number(OTP_VALIDATION_TIME)).toString();
export const OTP_EXPIRATION_TIMER_KEY = "otp_expiration_timer_key";
export const OTP_LENGTH = 6;
