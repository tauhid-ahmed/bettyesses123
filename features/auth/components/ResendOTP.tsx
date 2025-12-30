"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  OTP_EXPIRATION_TIME,
  OTP_EXPIRATION_TIMER_KEY,
  OTP_TIMER_KEY,
  OTP_VALIDATION_TIME,
  REGISTER_USER_KEY,
} from "../constant";
import { resendOTP } from "../actions/resend-otp";
import { useOTPTimer } from "../provider/OTPTimer";

export default function ResendOTP() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { setNewExpireTime } = useOTPTimer();

  useEffect(() => {
    setIsMounted(true);

    const checkTimer = () => {
      if (typeof window === "undefined") return;

      const expiryTime = localStorage.getItem(OTP_EXPIRATION_TIMER_KEY);

      if (!expiryTime) {
        setIsDisabled(false);
        return;
      }

      const now = Date.now();
      const expiry = Number(expiryTime);
      const remaining = Math.max(0, Math.floor((expiry - now) / 1000));

      setIsDisabled(remaining > 0);
    };
    checkTimer();
    const interval = setInterval(checkTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResend = async () => {
    if (isDisabled || isLoading) return;

    const registerUserId = localStorage.getItem(REGISTER_USER_KEY);
    const isFoundRegisterUserId = Boolean(registerUserId);
    if (!isFoundRegisterUserId)
      return toast.error("User not found! Please register again");

    const response = await resendOTP(registerUserId as string);
    localStorage.setItem(OTP_EXPIRATION_TIMER_KEY, Date.now().toString());

    if (response.success) {
      toast.success(response.message);
      localStorage.setItem(OTP_TIMER_KEY, OTP_VALIDATION_TIME);
      localStorage.setItem(OTP_EXPIRATION_TIMER_KEY, OTP_EXPIRATION_TIME());
      setNewExpireTime(Number(OTP_EXPIRATION_TIME()) - Date.now());
    } else if (!response.success) toast.error(response.message);
  };

  if (!isMounted) {
    return (
      <Button
        variant="link"
        className="disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={true}
      >
        Resend
      </Button>
    );
  }

  return (
    <Button
      variant="link"
      className="text-gray-900 font-bold px-1 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isDisabled || isLoading}
      onClick={handleResend}
    >
      {isLoading ? "Sending..." : "Resend"}
    </Button>
  );
}
