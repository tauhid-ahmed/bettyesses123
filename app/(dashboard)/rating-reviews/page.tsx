/* eslint-disable @next/next/no-img-element */

"use client";
import { useState } from "react";
import { Star, Users, Trash2, Eye,  } from "lucide-react";

// -------------------- Types --------------------
type Review = {
  id: string;
  author: {
    name: string;
    avatar: string;
    bookOrder: number;
  };
  rating: number;
  date: string;
  comment: string;
  images: string[];
  isPublic: boolean;
};

// -------------------- Initial Data --------------------
const INITIAL_REVIEWS: Review[] = [
  {
    id: "1",
    author: {
      name: "Afiya Jaman",
      avatar: "/images/review-and-rating-page-image/profile.jpg",
      bookOrder: 2,
    },
    rating: 4,
    date: "26-08-2025",
    comment:
      "From the very first interaction, I was impressed by the level of professionalism and care this team provided.",
    images: [
      "/images/review-and-rating-page-image/cartimage-one.png",
      "/images/review-and-rating-page-image/cartimage-two.png",
    ],
    isPublic: true,
  },
  {
    id: "2",
    author: {
      name: "Rahim Uddin",
      avatar: "/images/review-and-rating-page-image/profile.jpg",
      bookOrder: 1,
    },
    rating: 5,
    date: "24-08-2025",
    comment:
      "Outstanding experience! Everything was smooth and exceeded my expectations.",
    images: [
      "/images/review-and-rating-page-image/cartimage-one.png",
      "/images/review-and-rating-page-image/cartimage-two.png",
    ],
    isPublic: true,
  },
  {
    id: "3",
    author: {
      name: "Nusrat Jahan",
      avatar: "/images/review-and-rating-page-image/profile.jpg",
      bookOrder: 3,
    },
    rating: 3,
    date: "22-08-2025",
    comment:
      "The service was decent, but communication could be improved a bit.",
    images: [
      "/images/review-and-rating-page-image/cartimage-one.png",
      "/images/review-and-rating-page-image/cartimage-two.png",
    ],
    isPublic: false,
  },
  {
    id: "4",
    author: {
      name: "Karim Ahmed",
      avatar: "/images/review-and-rating-page-image/profile.jpg",
      bookOrder: 4,
    },
    rating: 5,
    date: "20-08-2025",
    comment: "Absolutely amazing service! Highly recommended to everyone.",
    images: [
      "/images/review-and-rating-page-image/cartimage-one.png",
      "/images/review-and-rating-page-image/cartimage-two.png",
    ],
    isPublic: true,
  },
  {
    id: "5",
    author: {
      name: "Sadiya Khan",
      avatar: "/images/review-and-rating-page-image/profile.jpg",
      bookOrder: 5,
    },
    rating: 2,
    date: "18-08-2025",
    comment:
      "Expected better quality. There were several issues with delivery.",
    images: ["/images/review-and-rating-page-image/cartimage-one.png"],
    isPublic: false,
  },
];

// -------------------- Components --------------------
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-orange-400 text-orange-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({
  review,
  showActions = true,
  onDelete,
  onTogglePublic,
}: {
  review: Review;
  showActions?: boolean;
  onDelete: (id: string) => void;
  onTogglePublic?: (id: string) => void;
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="flex items-center justify-center">
            <img
              src={review.author.avatar}
              alt="profile-image"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {review.author.name}
            </h3>
            <p className="text-xs text-gray-500">
              Book Order {review.author.bookOrder}
            </p>
          </div>
        </div>

        {/* Right Section - Actions */}
        {showActions && onTogglePublic && (
          <div className="flex gap-2">
            <button
              onClick={() => onTogglePublic(review.id)}
              className="flex items-center gap-2 px-4 py-2 bg-[#73B7FF] text-white text-sm rounded-md hover:bg-blue-600 transition"
            >
              <Eye className="w-4 h-4" />
              {review.isPublic ? "Public" : "Private"}
            </button>
            <button
              onClick={() => onDelete(review.id)}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF4D4F] text-white text-sm rounded-md hover:bg-red-600 transition"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}

        {/* Public Reviews - Only Delete */}
        {!showActions && (
          <button
            onClick={() => onDelete(review.id)}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF4D4F] text-white text-sm rounded-md hover:bg-red-600 transition"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        )}
      </div>

      {/* Rating and Date */}
      <div className="flex items-center gap-3 mt-4">
        <RatingStars rating={review.rating} />
        <span className="text-xs text-gray-500">{review.date}</span>
      </div>

      {/* Comment */}
      <p className="text-sm text-gray-700 mt-3 leading-relaxed">
        {review.comment}
      </p>

      {/* Images */}
      {review.images.length > 0 && (
        <div className="flex gap-2 mt-4">
          {review.images.map((img, index) => (
            <div key={index} className="w-16 rounded-lg overflow-hidden">
              <img src={img} alt="" className="h-full object-fill" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const StatsCard = ({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <h3 className="text-[36px] font-semibold text-dark-800">{value}</h3>
        <p className="text-sm text-gray-500 mt-1">{label}</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
        <Icon className="w-5 h-5 text-blue-700" />
      </div>
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}: {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3);
      } else if (currentPage >= totalPages - 2) {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Showing</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="px-2 py-1 border border-gray-200 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>3</option>
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>
        <span>
          out of <span className="font-medium">{totalItems}</span>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 text-sm rounded ${
              page === currentPage
                ? "bg-[#0556AB] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <>
            <span className="px-2 text-gray-400">...</span>
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-8 h-8 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const StarFilter = ({
  currentStar,
  onStarChange,
}: {
  currentStar: number | null;
  onStarChange: (star: number | null) => void;
}) => {
  const handlePrevious = () => {
    if (currentStar === null) return;
    if (currentStar > 1) {
      onStarChange(currentStar - 1);
    }
  };

  const handleNext = () => {
    if (currentStar === null) return;
    if (currentStar < 5) {
      onStarChange(currentStar + 1);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md">
      <button
        onClick={handlePrevious}
        disabled={currentStar === null || currentStar === 1}
        className="hover:opacity-80 transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <span className="text-base font-medium">
        {currentStar
          ? `${currentStar} star${currentStar > 1 ? "s" : ""}`
          : "All"}
      </span>
      <button
        onClick={handleNext}
        disabled={currentStar === null || currentStar === 5}
        className="hover:opacity-80 transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

const SearchBar = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-xs px-4 py-2 pl-10 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <svg
        className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

// -------------------- Main Component --------------------
export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [recentSearchQuery, setRecentSearchQuery] = useState("");
  const [publicSearchQuery, setPublicSearchQuery] = useState("");
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [recentPage, setRecentPage] = useState(1);
  const [publicPage, setPublicPage] = useState(1);
  const [recentItemsPerPage, setRecentItemsPerPage] = useState(3);
  const [publicItemsPerPage, setPublicItemsPerPage] = useState(3);

  // Filter and search functions
  const getFilteredRecentReviews = () => {
    let filtered = reviews;

    // Apply star filter
    if (starFilter !== null) {
      filtered = filtered.filter((r) => r.rating === starFilter);
    }

    // Apply search
    if (recentSearchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.author.name
            .toLowerCase()
            .includes(recentSearchQuery.toLowerCase()) ||
          r.comment.toLowerCase().includes(recentSearchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const getFilteredPublicReviews = () => {
    let filtered = reviews.filter((r) => r.isPublic);

    // Apply search
    if (publicSearchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.author.name
            .toLowerCase()
            .includes(publicSearchQuery.toLowerCase()) ||
          r.comment.toLowerCase().includes(publicSearchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  // Pagination
  const paginateReviews = (
    reviews: Review[],
    page: number,
    perPage: number
  ) => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return reviews.slice(start, end);
  };

  const filteredRecentReviews = getFilteredRecentReviews();
  const filteredPublicReviews = getFilteredPublicReviews();

  const paginatedRecentReviews = paginateReviews(
    filteredRecentReviews,
    recentPage,
    recentItemsPerPage
  );
  const paginatedPublicReviews = paginateReviews(
    filteredPublicReviews,
    publicPage,
    publicItemsPerPage
  );

  // Calculate stats
  const calculateAverageRating = () => {
    if (reviews.length === 0) return "0.0";
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  // Actions
  const handleDelete = (id: string) => {

      setReviews(reviews.filter((r) => r.id !== id));

  };

  const handleTogglePublic = (id: string) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, isPublic: !r.isPublic } : r))
    );
  };

  return (
    <div className="">
      <div className="space-y-6">
        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-6">
          <StatsCard
            icon={Star}
            value={calculateAverageRating()}
            label="Average Rating"
          />
          <StatsCard
            icon={Users}
            value={reviews.length.toString()}
            label="Total Reviews"
          />
        </div>

        {/* Recent Reviews Section */}
        <div className="bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent reviews
            </h2>
            <div className="flex items-center gap-3">
              <StarFilter
                currentStar={starFilter}
                onStarChange={setStarFilter}
              />
              <SearchBar
                placeholder="Search"
                value={recentSearchQuery}
                onChange={setRecentSearchQuery}
              />
            </div>
          </div>

          <div className="space-y-4">
            {paginatedRecentReviews.length > 0 ? (
              paginatedRecentReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  showActions={true}
                  onDelete={handleDelete}
                  onTogglePublic={handleTogglePublic}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No reviews found
              </div>
            )}
          </div>

          {filteredRecentReviews.length > 0 && (
            <Pagination
              currentPage={recentPage}
              totalPages={Math.ceil(
                filteredRecentReviews.length / recentItemsPerPage
              )}
              itemsPerPage={recentItemsPerPage}
              totalItems={filteredRecentReviews.length}
              onPageChange={setRecentPage}
              onItemsPerPageChange={(items) => {
                setRecentItemsPerPage(items);
                setRecentPage(1);
              }}
            />
          )}
        </div>

        {/* Public Reviews Section */}
        <div className="bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Public reviews
            </h2>
            <SearchBar
              placeholder="Search"
              value={publicSearchQuery}
              onChange={setPublicSearchQuery}
            />
          </div>

          <div className="space-y-4">
            {paginatedPublicReviews.length > 0 ? (
              paginatedPublicReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  showActions={false}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No public reviews found
              </div>
            )}
          </div>

          {filteredPublicReviews.length > 0 && (
            <Pagination
              currentPage={publicPage}
              totalPages={Math.ceil(
                filteredPublicReviews.length / publicItemsPerPage
              )}
              itemsPerPage={publicItemsPerPage}
              totalItems={filteredPublicReviews.length}
              onPageChange={setPublicPage}
              onItemsPerPageChange={(items) => {
                setPublicItemsPerPage(items);
                setPublicPage(1);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
