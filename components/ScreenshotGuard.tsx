"use client";

import { useEffect, useState } from "react";

type Props = {
  userId: string;
  children: React.ReactNode;
};

export default function WatermarkGuard({ userId, children }: Props) {
  const [pos, setPos] = useState({ x: 20, y: 20 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPos({
        x: Math.random() * 60 + 20,
        y: Math.random() * 60 + 20,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    // <div className="relative">
    //   {/* Watermark */}
    //   <div
    //     className="pointer-events-none fixed z-50 text-xs font-medium opacity-20 select-none"
    //     style={{
    //       left: `${pos.x}%`,
    //       top: `${pos.y}%`,
    //       transform: "translate(-50%, -50%) rotate(-20deg)",
    //     }}
    //   >
    //     CONFIDENTIAL · {userId} · {new Date().toLocaleDateString()}
    //   </div>

    <>{children}</>
    // </div>
  );
}
