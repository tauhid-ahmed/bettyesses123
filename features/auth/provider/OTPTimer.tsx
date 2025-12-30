"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { OTP_EXPIRATION_TIMER_KEY } from "../constant";

interface OTPTimerContextType {
  expireTime: number;
  setNewExpireTime: (seconds: number) => void;
  clearExpireTime: () => void;
}

const OTPTimerContext = createContext<OTPTimerContextType | undefined>(
  undefined
);

export function OTPTimerProvider({ children }: { children: ReactNode }) {
  const [expireTime, setExpireTime] = useState<number>(0);

  useEffect(() => {
    const storedExpireTime = localStorage.getItem(OTP_EXPIRATION_TIMER_KEY);
    if (storedExpireTime) {
      setExpireTime(Number(storedExpireTime));
    }
  }, []);

  const setNewExpireTime = (seconds: number) => {
    const newExpireTime = Date.now() + seconds * 1000;
    localStorage.setItem(OTP_EXPIRATION_TIMER_KEY, newExpireTime.toString());
    setExpireTime(newExpireTime);
  };

  const clearExpireTime = () => {
    localStorage.removeItem(OTP_EXPIRATION_TIMER_KEY);
    setExpireTime(0);
  };

  return (
    <OTPTimerContext.Provider
      value={{ expireTime, setNewExpireTime, clearExpireTime }}
    >
      {children}
    </OTPTimerContext.Provider>
  );
}

export function useOTPTimer() {
  const context = useContext(OTPTimerContext);
  if (context === undefined) {
    throw new Error("useOTPTimer must be used within OTPTimerProvider");
  }
  return context;
}
