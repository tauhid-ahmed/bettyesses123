"use client"
import { useState, useRef } from 'react';
import { Star, Camera, X, Upload } from 'lucide-react';

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please provide a rating');
      return;
    }
    
    if (!review.trim()) {
      alert('Please write a review');
      return;
    }

    const formData = new FormData();
    formData.append('rating', rating);
    formData.append('review', review);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    // Professional logging
    console.log('=== Review Submission ===');
    console.log('Rating:', rating);
    console.log('Review:', review);
    console.log('Image File:', imageFile);
    console.log('File Details:', {
      name: imageFile?.name,
      size: imageFile?.size,
      type: imageFile?.type,
      lastModified: imageFile?.lastModified
    });
    console.log('FormData:', formData);
    
    alert('Review submitted successfully! Check console for details.');
  };

  return (
    <div className=" flex items-center justify-center py-12">
      <div className="w-full max-w-7xl bg-white/70 backdrop-blur-md rounded-xl shadow-md p-10 border border-white/50">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Share your experience with us!
        </h1>

        {/* Rating Section */}
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
                  className={`${
                    value <= (hoveredRating || rating)
                      ? 'fill-orange-400 text-orange-400'
                      : 'fill-gray-200 text-gray-200'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Review Text Area */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-3">
            A short review
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with this product..."
            className="w-full h-32 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Photo Upload Section */}
        <div className="mb-6">
          <div
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative block w-full border-2 border-dashed rounded-xl p-6 text-center transition-all ${
              isDragging
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            {image ? (
              <div className="relative">
                <img
                  src={image}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded-lg object-cover"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors shadow-lg"
                  type="button"
                >
                  <X size={20} />
                </button>
                <div className="mt-3 text-sm text-gray-600">
                  <p className="font-medium">{imageFile?.name}</p>
                  <p className="text-xs text-gray-500">
                    {(imageFile?.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <button
                  onClick={handleBrowseClick}
                  className="mt-3 text-purple-600 hover:text-purple-700 text-sm font-medium underline"
                  type="button"
                >
                  Change photo
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center">
                  <Camera size={48} className="text-gray-400 mb-3" />
                  <p className="text-gray-700 font-medium mb-1">Upload Photo</p>
                  <p className="text-sm text-gray-500 mb-3">
                    Drag and drop or click to browse
                  </p>
                  <button
                    onClick={handleBrowseClick}
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <Upload size={16} />
                    Browse Files
                  </button>
                </div>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}