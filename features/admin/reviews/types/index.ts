export interface Reviewer {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  image?: string;
  _count?: {
    orders: number;
  };
}

export interface BookTemplate {
  title: string;
}

export interface Book {
  id?: string;
  childName: string;
  template: BookTemplate;
}

export interface Review {
  id: string;
  reviewerId: string;
  bookId: string;
  rating: number;
  comment: string;
  images: string[];
  isFeatured: boolean;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  reviewer: Reviewer;
  book: Book;
}

export interface ReviewStats {
  totalReviews: number;
  publicReviews: number;
  pendingReviews: number;
  featuredReviews: number;
  averageRating: number;
  ratingDistribution: {
    [key: string]: number;
  };
}

export interface ReviewStatsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ReviewStats;
}

export interface ReviewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
  data: Review[];
}

export interface SingleReviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Review;
}
