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
import ResendOTP from "./ResendOTP";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Timer from "./Timer";

export function OTPForm() {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  const handleVerify = async () => {
    if (otp.length !== 4) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    const email =
      typeof window !== "undefined" ? localStorage.getItem("email") : null;

    if (!email) {
      toast.error("Email not found. Please login again.");
      router.push("/");
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch(`/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Invalid OTP. Please try again.");
        return;
      }

      // Success - cleanup localStorage
      localStorage.removeItem("email");
      localStorage.removeItem("otp-expiry");
      localStorage.removeItem("otp-timer");

      toast.success(data.message || "OTP verified successfully.");
      console.log(data);

      window.location.href = "/dashboard";
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
            Please enter the 6-digit code we just sent to your email address.
            The code will expire in
          </h2>
          <Timer />
        </div>
      </div>
      <div className="flex justify-center">
        <InputOTP
          maxLength={6}
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
        <div className="flex items-center gap-2 justify-between text-sm mx-auto">
          <span>Didn&apos;t receive the code?</span>
          <ResendOTP />
        </div>
        <Button
          className="w-full mx-auto mt-4"
          onClick={handleVerify}
          disabled={isVerifying || otp.length !== 4}
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </div>
  );
}
