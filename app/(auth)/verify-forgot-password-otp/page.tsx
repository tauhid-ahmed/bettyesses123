import { ForgotPasswordOTPForm } from "@/features/auth/components/ForgotPasswordOTPForm";
import { OTPTimerProvider } from "@/features/auth/provider/OTPTimer";

export default function VerifyOtp() {
  return (
    <OTPTimerProvider>
      <ForgotPasswordOTPForm />
    </OTPTimerProvider>
  );
}
