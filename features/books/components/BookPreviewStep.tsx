"use client";

import { useEffect, useState } from "react";
import { usePersonalizeBook } from "../context/PersonalizeBookContext";

export default function BookPreviewStep() {
  const { formData } = usePersonalizeBook();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto p-8 min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {formData.childName}'s Book Preview
        </h1>
        <p className="text-gray-600 mb-12">
          Generating the personalized book for you
        </p>

        <div className="relative w-64 h-64 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="100"
              stroke="#e5e7eb"
              strokeWidth="20"
              fill="none"
            />
            <circle
              cx="128"
              cy="128"
              r="100"
              stroke="url(#gradient)"
              strokeWidth="20"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 100}`}
              strokeDashoffset={`${2 * Math.PI * 100 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-bold text-purple-600">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
