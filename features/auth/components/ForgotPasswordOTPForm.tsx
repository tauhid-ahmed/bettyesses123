"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Timer from "./Timer";
import {
  OTP_EXPIRATION_TIMER_KEY,
  OTP_LENGTH,
  OTP_VALIDATION_TIME,
  REGISTER_USER_KEY,
} from "../constant";
import { verifyForgotPasswordOtp } from "../actions/verify-forgot-password-otp";
import { resetPasswordPath } from "@/paths";

export function ForgotPasswordOTPForm() {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  const handleVerify = async () => {
    setIsVerifying(true);
    const registerUserId = localStorage.getItem(REGISTER_USER_KEY);
    try {
      const data = await verifyForgotPasswordOtp({
        userId: registerUserId as string,
        otpCode: otp,
      });

      if (data.success) {
        toast.success(data.message);

        localStorage.removeItem(OTP_EXPIRATION_TIMER_KEY);
        localStorage.removeItem(OTP_VALIDATION_TIME);
        router.push(resetPasswordPath());
      }

      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md mt-8 space-y-4">
      <div className="space-y-2">
        <h1 className="text-center font-medium text-2xl md:text-[32px] text-primary-800">
          Enter the 6-digit verification code sent to your email
        </h1>

        <div>
          <h2 className="text-sm text-gray-500 text-center max-w-md mx-auto mt-4">
            Please enter the {OTP_LENGTH}-digit code we just sent to your email
            address. The code will expire in
          </h2>
          <Timer />
        </div>
      </div>
      <div className="flex justify-center">
        <InputOTP
          maxLength={OTP_LENGTH}
          pattern={REGEXP_ONLY_DIGITS}
          value={otp}
          onChange={(value) => setOtp(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="px-4">
        <Button
          className="w-full mx-auto mt-4"
          onClick={handleVerify}
          disabled={isVerifying || otp.length !== OTP_LENGTH}
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </div>
  );
}
