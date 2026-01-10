import { getReviewStats } from "@/features/admin/reviews/actions/get-review-stats";
import ReviewsPageClient from "@/features/admin/reviews/components/ReviewsPageClient";

export default async function ReviewsPage() {
  const statsRes = await getReviewStats();
  const initialStats = statsRes.data || {
    totalReviews: 0,
    publicReviews: 0,
    pendingReviews: 0,
    featuredReviews: 0,
    averageRating: 0,
    ratingDistribution: {}
  };

  return <ReviewsPageClient initialStats={initialStats} />;
}
