"use client";

import { useState, useEffect } from "react";
import { Clock5 } from "lucide-react";

export default function Timer({ onExpire }: { onExpire?: () => void }) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize from localStorage after mount
  useEffect(() => {
    setIsMounted(true);

    const storedSeconds = localStorage.getItem("otp-timer");
    const expiryTime = localStorage.getItem("otp-expiry");

    // If we have seconds but no expiry time, convert to expiry time
    if (storedSeconds && !expiryTime) {
      const seconds = Number(storedSeconds);
      const expiry = Date.now() + seconds * 1000;
      localStorage.setItem("otp-expiry", expiry.toString());
      localStorage.removeItem("otp-timer"); // Clean up old format
      setTimeLeft(seconds);
    }
    // If we have expiry time, calculate remaining
    else if (expiryTime) {
      const now = Date.now();
      const expiry = Number(expiryTime);
      const remaining = Math.max(0, Math.floor((expiry - now) / 1000));
      setTimeLeft(remaining);

      if (remaining === 0) {
        localStorage.removeItem("otp-expiry");
      }
    } else {
      setTimeLeft(0);
    }
  }, []);

  // Handle countdown with real clock time
  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      onExpire?.();
      localStorage.removeItem("otp-expiry");
      return;
    }

    const timer = setInterval(() => {
      const expiryTime = localStorage.getItem("otp-expiry");

      if (!expiryTime) {
        setTimeLeft(0);
        return;
      }

      const now = Date.now();
      const expiry = Number(expiryTime);
      const remaining = Math.max(0, Math.floor((expiry - now) / 1000));

      setTimeLeft(remaining);

      if (remaining === 0) {
        localStorage.removeItem("otp-expiry");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Prevent layout shift by rendering placeholder until mounted
  if (!isMounted || timeLeft === null) {
    return (
      <div className="flex items-center gap-2 justify-center text-sm mt-2">
        <Clock5 className="size-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          <span className="text-sm text-gray-500">00:00</span>{" "}
          <span className="text-sm font-semibold">s</span>
        </span>
      </div>
    );
  }

  const isExpired = timeLeft === 0;
  const isWarning = timeLeft <= 30 && timeLeft > 0;

  return (
    <div className="flex items-center gap-2 justify-center mt-2">
      <Clock5
        className={`size-4 ${
          isExpired
            ? "text-red-500"
            : isWarning
            ? "text-orange-500"
            : "text-gray-500"
        }`}
      />
      <span
        className={`text-sm font-medium leading-1 ${
          isExpired
            ? "text-red-500"
            : isWarning
            ? "text-orange-500"
            : "text-gray-700"
        }`}
      >
        <span className="text-gray-500">
          {isExpired ? "Expired" : formatTime(timeLeft)}
        </span>{" "}
        <span className="font-semibold">s</span>
      </span>
    </div>
  );
}
