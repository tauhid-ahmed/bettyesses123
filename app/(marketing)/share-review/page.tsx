"use client";

import { useState, useRef, JSX } from "react";
import { Star, X, Upload } from "lucide-react";

export default function ReviewForm(): JSX.Element {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* ================= HANDLERS ================= */

  const handleStarClick = (value: number): void => {
    setRating(value);
  };

  const processFile = (file: File): void => {
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file");
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveImage = (): void => {
    setImage(null);
    setImageFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleBrowseClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (): void => {
    if (rating === 0) {
      alert("Please provide a rating");
      return;
    }

    if (!review.trim()) {
      alert("Please write a review");
      return;
    }

    const formData = new FormData();
    formData.append("rating", rating.toString());
    formData.append("review", review);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    console.log("=== Review Submission ===");
    console.log("Rating:", rating);
    console.log("Review:", review);
    console.log("Image File:", imageFile);
    console.log("FormData:", formData);

    alert("Review submitted successfully!");
  };

  /* ================= UI ================= */

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-7xl bg-white/70 backdrop-blur-md rounded-xl shadow-md p-10 border border-white/50">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Share your experience with us!
        </h1>

        {/* Rating */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-3">
            Give us a rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleStarClick(value)}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={36}
                  className={
                    value <= (hoveredRating || rating)
                      ? "fill-orange-400 text-orange-400"
                      : "fill-gray-200 text-gray-200"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        {/* Review */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-3">
            A short review
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full h-32 px-4 py-3 border rounded-xl"
          />
        </div>

        {/* Image Upload */}
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-6 text-center ${
            isDragging ? "border-purple-500 bg-purple-50" : "border-gray-300"
          }`}
        >
          {image ? (
            <div className="relative">
              <img src={image} alt="Preview" className="mx-auto max-h-48" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleBrowseClick}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg"
            >
              <Upload size={16} />
              Browse Files
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
