import AuthCard from "@/features/auth/components/AuthCard";
import { ForgotPasswordOTPForm } from "@/features/auth/components/ForgotPasswordOTPForm";
import { OTPTimerProvider } from "@/features/auth/provider/OTPTimer";

export default function VerifyOtp() {
  return (
    <OTPTimerProvider>
      <AuthCard title={""}>
        <ForgotPasswordOTPForm />
      </AuthCard>
    </OTPTimerProvider>
  );
}
