import Message from "@/features/auth/components/Message";
import { OTPForm } from "@/features/auth/components/OTPForm";

export default function VerifyOtp() {
  return (
    <div>
      <OTPForm />
      <Message />
    </div>
  );
}
