"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ResetSuccessPage() {
  return (
    <div className="w-full">
      <CheckCircleIcon />
      <h1 className="text-center font-medium text-2xl md:text-[32px] text-primary-800 mt-6">
        Password Reset Successful
      </h1>
      <h2 className="text-sm text-gray-500 text-center">
        Your password has been updated
      </h2>
      <div className="sm:px-10">
        <Button className="w-full mt-10" size="lg" asChild>
          <Link href="/login">Back to Login</Link>
        </Button>
      </div>
    </div>
  );
}

export function CheckCircleIcon() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto size-14 md:size-18 lg:size-25"
    >
      <path
        d="M50 0C22.3857 0 0 22.3857 0 50C0 77.6143 22.3857 100 50 100C77.6143 100 100 77.6143 100 50C100 22.3857 77.6143 0 50 0ZM71.4538 23.4192L81.8419 33.8073L49.3958 66.2598L39.0686 76.5808L28.6804 66.1927L18.1579 55.664L28.479 45.3429L39.0015 55.8715L71.4538 23.4192Z"
        fill="#73B7FF"
      />
    </svg>
  );
}
