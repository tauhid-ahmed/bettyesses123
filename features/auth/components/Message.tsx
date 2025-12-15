"use client";

import { useEffect, useState } from "react";

export default function Message() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <p className="text-gray-500 text-sm text-center mt-6">
      Code has send to{" "}
      <strong className="font-medium">
        {mounted ? localStorage.getItem("email") : "*********"}
      </strong>
    </p>
  );
}
