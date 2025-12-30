"use client";

import { useState, useEffect } from "react";
import { Clock5 } from "lucide-react";
import { useOTPTimer } from "../provider/OTPTimer";

export default function Timer({ onExpire }: { onExpire?: () => void }) {
  const { expireTime, clearExpireTime } = useOTPTimer();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (expireTime > 0) {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((expireTime - now) / 1000));

      // If already expired on load, clear immediately
      if (remaining === 0) {
        clearExpireTime();
        setTimeLeft(0);
      } else {
        setTimeLeft(remaining);
      }
    } else {
      setTimeLeft(0);
    }
  }, [expireTime, clearExpireTime]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((expireTime - now) / 1000));

      setTimeLeft(remaining);

      if (remaining === 0) {
        clearExpireTime();
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, expireTime, onExpire, clearExpireTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

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
            ? "text-rose-500"
            : isWarning
            ? "text-orange-500"
            : "text-gray-500"
        }`}
      />
      <span
        className={`text-sm font-medium leading-1 ${
          isExpired
            ? "text-rose-500"
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
