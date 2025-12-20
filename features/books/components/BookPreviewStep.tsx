"use client";

import { useEffect, useState } from "react";
import { usePersonalizeBook } from "../context/PersonalizeBookContext";
import { useRouter, usePathname } from "next/navigation";
import Section from "@/components/Section";

export default function BookPreviewStep() {
  const { formData } = usePersonalizeBook();
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  // Progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Navigation side-effect
  useEffect(() => {
    if (progress === 100) {
      router.push(`${pathname}/preview`);
    }
  }, [progress, router, pathname]);

  return (
    <Section
      title={`${formData.childName}'s Book Preview`}
      description="Creating a personalized book just for you."
    >
      <div className="relative w-64 h-64 mx-auto mt-6">
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
            strokeDasharray={2 * Math.PI * 100}
            strokeDashoffset={2 * Math.PI * 100 * (1 - progress / 100)}
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
    </Section>
  );
}
