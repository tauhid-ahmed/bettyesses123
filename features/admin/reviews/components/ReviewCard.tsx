/* eslint-disable @next/next/no-img-element */
import { Eye, Trash2, Star } from "lucide-react";
import { Review } from "../types";

interface ReviewCardProps {
  review: Review;
  showActions?: boolean;
  isProcessing?: boolean;
  onDelete?: (id: string) => void;
  onTogglePublic?: (id: string) => void;
}

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

export const ReviewCard = ({
  review,
  showActions = true,
  isProcessing = false,
  onDelete,
  onTogglePublic,
}: ReviewCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 transition-all hover:bg-gray-50">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="flex items-center justify-center">
            <img
              src={review.reviewer.image || "/images/placeholder-avatar.png"} // Fallback image
              alt={review.reviewer.firstName}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                 (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + review.reviewer.firstName + '+' + review.reviewer.lastName;
              }}
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {review.reviewer.firstName} {review.reviewer.lastName}
            </h3>
            <p className="text-xs text-gray-500">
               Book: {review.book.template.title}
             {/*  Reviewer Order Count if available  */}
             {review.reviewer._count?.orders !== undefined && (
                <span className="ml-2">• {review.reviewer._count.orders} Orders</span>
             )}
            </p>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex gap-2">
            {showActions && onTogglePublic && (
                <button
                onClick={() => onTogglePublic(review.id)}
                disabled={isProcessing}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition ${
                    review.isPublic 
                    ? "bg-[#73B7FF] text-white hover:bg-blue-600" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } disabled:opacity-50`}
                >
                <Eye className="w-4 h-4" />
                {review.isPublic ? "Public" : "Make Public"}
                </button>
            )}
            
            {onDelete && (
                 <button
                onClick={() => onDelete(review.id)}
                 disabled={isProcessing}
                className="flex items-center gap-2 px-4 py-2 bg-[#FF4D4F] text-white text-sm rounded-md hover:bg-red-600 transition disabled:opacity-50"
                >
                <Trash2 className="w-4 h-4" />
                Delete
                </button>
            )}
        </div>
      </div>

      {/* Rating and Date */}
      <div className="flex items-center gap-3 mt-4">
        <RatingStars rating={review.rating} />
        <span className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Comment */}
      <p className="text-sm text-gray-700 mt-3 leading-relaxed">
        {review.comment}
      </p>

      {/* Images */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mt-4">
          {review.images.map((img, index) => (
            <div key={index} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-100">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
