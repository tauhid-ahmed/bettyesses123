"use client";

import { useState } from "react";
import starIcon from "@/images/icons/star.svg";
import Image from "next/image";

interface RatingProps {
  value?: number;
  onChange?: (rating: number) => void;
  max?: number;
  size?: number;
  readonly?: boolean;
  precision?: number;
  showValue?: boolean;
  className?: string;
}

export default function Rating({
  value = 0,
  onChange,
  max = 5,
  size = 24,
  readonly = false,
  precision = 1,
  showValue = false,
  className = "",
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [internalValue, setInternalValue] = useState(value);

  const isControlled = onChange !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const displayValue = hoverValue ?? currentValue;

  const handleClick = (rating: number) => {
    if (readonly) return;

    if (isControlled) {
      onChange(rating);
    } else {
      setInternalValue(rating);
    }
  };

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (readonly) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;

    let rating;
    if (precision === 0.5) {
      rating = index + (percent > 0.5 ? 1 : 0.5);
    } else {
      rating = index + 1;
    }

    setHoverValue(rating);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverValue(null);
  };

  const renderStar = (index: number) => {
    const fillPercent = Math.min(Math.max(displayValue - index, 0), 1) * 100;
    const isFilled = fillPercent > 0;

    return (
      <div
        key={index}
        className={`relative ${!readonly ? "cursor-pointer" : ""}`}
        onClick={() => handleClick(index + 1)}
        onMouseMove={(e) => handleMouseMove(e, index)}
        onMouseLeave={handleMouseLeave}
        style={{ width: size, height: size, display: "inline-block" }}
      >
        {/* Background empty star */}
        <Image
          src={starIcon}
          alt="star"
          width={size}
          height={size}
          className="opacity-20"
          style={{ display: "block", width: size, height: size }}
        />

        {/* Filled star overlay */}
        {isFilled && (
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${fillPercent}%`, height: size }}
          >
            <div style={{ width: size, height: size }}>
              <Image
                src={starIcon}
                alt="star"
                width={size}
                height={size}
                style={{ display: "block", width: size, height: size }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">{[...Array(max)].map((_, i) => renderStar(i))}</div>
      {showValue && (
        <span className="ml-2 text-sm text-gray-600">
          {currentValue.toFixed(precision === 0.5 ? 1 : 0)} / {max}
        </span>
      )}
    </div>
  );
}
