/* eslint-disable @next/next/no-img-element */
import { Star, Users, Trash2, Eye, HandHeart } from "lucide-react";

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

// -------------------- Dummy Data --------------------
const DUMMY_REVIEWS: Review[] = [
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
];

const PUBLIC_REVIEWS: Review[] = [
  {
    id: "4",
    author: {
      name: "Afiya Jaman",
      avatar: "/images/review-and-rating-page-image/profile.jpg",
      bookOrder: 2,
    },
    rating: 4,
    date: "26-08-2025",
    comment:
      "From the very first interaction, I was impressed by the level of professionalism and care this team provided. The onboarding process was smooth.",
    images: [
      "/images/review-and-rating-page-image/cartimage-one.png",
      "/images/review-and-rating-page-image/cartimage-two.png",
    ],
    isPublic: true,
  },
  {
    id: "5",
    author: {
      name: "Afiya Jaman",
      avatar: "/images/review-and-rating-page-image/profile.jpg",
      bookOrder: 2,
    },
    rating: 4,
    date: "26-08-2025",
    comment:
      "From the very first interaction, I was impressed by the level of professionalism and care this team provided. The onboarding process was smooth.",
    images: [
      "/images/review-and-rating-page-image/cartimage-one.png",
      "/images/review-and-rating-page-image/cartimage-two.png",
    ],
    isPublic: true,
  },
  {
    id: "5",
    author: {
      name: "Afiya Jaman",
      avatar: "/images/review-and-rating-page-image/profile.jpg",
      bookOrder: 2,
    },
    rating: 4,
    date: "26-08-2025",
    comment:
      "From the very first interaction, I was impressed by the level of professionalism and care this team provided. The onboarding process was smooth.",
    images: [
      "/images/review-and-rating-page-image/cartimage-one.png",
      "/images/review-and-rating-page-image/cartimage-two.png",
    ],
    isPublic: true,
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
}: {
  review: Review;
  showActions?: boolean;
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="  flex items-center justify-center ">
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
        {showActions && (
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#73B7FF] text-white text-sm rounded-md hover:bg-blue-600 transition">
              <Eye className="w-4 h-4" />
              Public
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#FF4D4F] text-white text-sm rounded-md hover:bg-red-600 transition">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}

        {/* Public Reviews - Only Delete */}
        {!showActions && (
          <button className="flex items-center gap-2 px-4 py-2 bg-[#FF4D4F] text-white text-sm rounded-md hover:bg-red-600 transition">
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
            <div key={index} className="w-16  rounded-lg  overflow-hidden">
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
        <HandHeart className="w-5 h-5 text-blue-700" />
      </div>
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const pages = [1, 2, 3];

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Showing</span>
        <select className="px-2 py-1 border border-gray-200 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>11</option>
          <option>20</option>
          <option>50</option>
          <option>100</option>
        </select>
        <span>
          out of <span className="font-medium">1,450</span>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
          Previous
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`w-8 h-8 text-sm rounded ${
              page === currentPage
                ? "bg-[#0556AB] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
        <span className="px-2 text-gray-400">...</span>
        <button className="w-8 h-8 text-sm text-gray-600 hover:bg-gray-100 rounded">
          16
        </button>
        <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

const StarFilter = () => {
  return (
    <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md">
      <button className="hover:opacity-80 transition">
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
      <span className="text-base font-medium">1 star</span>
      <button className="hover:opacity-80 transition">
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

const SearchBar = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
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
  return (
    <div className="">
      <div className="space-y-6">
        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-6">
          <StatsCard icon={Star} value="4.5" label="Average Rating" />
          <StatsCard icon={Users} value="3.1k" label="Total Reviews" />
        </div>

        {/* Recent Reviews Section */}
        <div className="bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent reviews
            </h2>
            <div className="flex items-center gap-3">
              <StarFilter />
              <SearchBar placeholder="Search" />
            </div>
          </div>

          <div className="space-y-4">
            {DUMMY_REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} showActions={true} />
            ))}
          </div>

          <Pagination currentPage={1} totalPages={16} />
        </div>

        {/* Public Reviews Section */}
        <div className="bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Public reviews
            </h2>
            <SearchBar placeholder="Search" />
          </div>

          <div className="space-y-4">
            {PUBLIC_REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} showActions={false} />
            ))}
          </div>
          <Pagination currentPage={1} totalPages={16} />
        </div>
      </div>
    </div>
  );
}
