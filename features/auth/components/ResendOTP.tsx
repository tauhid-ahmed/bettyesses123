"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ResendOTP() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Set mounted flag to ensure we're on the client
    setIsMounted(true);

    const checkTimer = () => {
      // Only access localStorage after component is mounted
      if (typeof window === "undefined") return;

      const expiryTime = localStorage.getItem("otp-expiry");

      if (!expiryTime) {
        setIsDisabled(false);
        return;
      }

      const now = Date.now();
      const expiry = Number(expiryTime);
      const remaining = Math.max(0, Math.floor((expiry - now) / 1000));

      setIsDisabled(remaining > 0);
    };

    // Check immediately
    checkTimer();

    // Check every second
    const interval = setInterval(checkTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResend = async () => {
    if (isDisabled || isLoading) return;

    setIsLoading(true);

    try {
      const email =
        typeof window !== "undefined" ? localStorage.getItem("email") : null;

      if (!email) {
        toast.error("Email not found. Please try logging in again.");
        router.push("/auth/login");
        return;
      }

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/admin/login/resend-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.message);
        return;
      }

      // Set new timer - 10 minutes (600 seconds)
      const expiryTime = Date.now() + 600 * 1000;
      localStorage.setItem("otp-expiry", expiryTime.toString());
      localStorage.setItem("otp-timer", "600");

      setIsDisabled(true);
      toast.success(responseData.message);
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Optionally prevent render flash during hydration
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
