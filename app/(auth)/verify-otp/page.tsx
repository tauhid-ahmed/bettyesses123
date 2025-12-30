import { OTPForm } from "@/features/auth/components/OTPForm";
import { OTPTimerProvider } from "@/features/auth/provider/OTPTimer";

export default function VerifyOtp() {
  return (
    <OTPTimerProvider>
      <OTPForm />
    </OTPTimerProvider>
  );
}
